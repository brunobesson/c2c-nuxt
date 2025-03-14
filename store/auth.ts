import type { LoginResponse } from '~/api/c2c.js';
import type { UiLang } from '~/api/lang.js';

type User = {
  id: number;
  name: string;
  username: string;
  lang: UiLang;
  forumUsername: string;
  token: string;
  expire: number;
  roles: string[];
};

export const useAuthStore = defineStore('auth', () => {
  const { isUiLang } = useLang();
  const userInfo = useCookie<User | null | undefined>('user', { maxAge: 60 * 60 * 24 * 30 });
  const user = computed(() => userInfo.value);
  const authenticated = computed(() => !!userInfo.value);
  const isModerator = computed(() => user.value?.roles.includes('moderator'));

  useIntervalFn(() => {
    if (!user.value) {
      return;
    }
    const now = Date.now() / 1000;
    if (now > user.value?.expire) {
      logout();
    }
  }, 5000);

  const authenticate = async (usernameInput: string, passwordInput: string): Promise<void> => {
    const {
      id,
      name,
      username,
      forum_username,
      expire,
      lang,
      roles,
      token,
      redirect_internal: discourseUrl,
    } = await useNuxtApp().$c2cFetch<LoginResponse>('/users/login', {
      method: 'POST',
      body: {
        username: usernameInput,
        password: passwordInput,
        discourse: true,
      },
    });

    await new Promise<void>(resolve => {
      if (!discourseUrl) {
        resolve();
      }
      // dirty way to SSO...
      // if somebody wants to implement a better solution, feel free
      // https://github.com/c2corg/v6_ui/blob/c9962a6c3bac0670eab732d563f9f480379f84d1/c2corg_ui/static/js/auth/auth.js
      const iframe = document.createElement('iframe');
      const sandbox = document.createAttribute('sandbox');

      sandbox.value = 'allow-same-origin';
      iframe.style.display = 'none';
      iframe.setAttributeNode(sandbox);
      iframe.src = discourseUrl!;

      // 10s to complete discourse authentication
      window.setTimeout(() => resolve(), 10000);
      iframe.addEventListener('load', () => resolve());

      document.body.appendChild(iframe);
    });

    userInfo.value = {
      id,
      name,
      username,
      forumUsername: forum_username,
      token,
      roles,
      expire,
      lang,
    };
    if (isUiLang(lang)) {
      useNuxtApp().$i18n.setLocale(lang);
    }
  };

  const logout = () => {
    useNuxtApp().$c2cFetch('/users/logout', { method: 'POST', body: { discourse: true } });
    userInfo.value = null;
  };

  const token = computed(() => user.value?.token);

  return { authenticated, user, isModerator, token, authenticate, logout };
});

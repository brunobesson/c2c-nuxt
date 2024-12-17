type UserPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
};

type User = {
  id: number;
  name: string;
  // lang TODO
  forumUsername: string;
  // TODO other fields, token & all
};

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('token');
  const userInfo = useCookie<User | null | undefined>('user');
  const authenticated = computed(() => !!userInfo.value);
  const user = computed(() => userInfo.value);

  async function authenticate({ username, password }: UserPayload) {
    const { data, status } = await useFetch<LoginResponse>(
      'https://dummyjson.com/auth/login',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      }
    );

    if (data.value) {
      token.value = data.value.accessToken;
      userInfo.value = {
        id: data.value.id,
        name: data.value.firstName + ' ' + data.value.lastName,
        forumUsername: data.value.username,
      };
    }
  }

  function logout() {
    token.value = null;
    userInfo.value = null;
  }

  return { authenticated, user, authenticate, logout };
});

import { useAuthStore } from '~/store/auth.js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { user } = storeToRefs(useAuthStore());

  const $c2cFetch = $fetch.create({
    baseURL: config.public.c2cApiBase,
    onRequest({ options }) {
      if (user.value?.token) {
        options.headers.set('Authorization', `JWT token="${user.value.token}"`);
      }
    },
  });

  return {
    provide: {
      c2cFetch: $c2cFetch,
    },
  };
});

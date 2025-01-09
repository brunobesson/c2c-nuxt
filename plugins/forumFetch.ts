export default defineNuxtPlugin(() => {
  const $forumFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.forumBase,
  });

  return {
    provide: {
      forumFetch: $forumFetch,
    },
  };
});

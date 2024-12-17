export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const $forumFetch = $fetch.create({
    baseURL: config.public.forumBase,
  });

  return {
    provide: {
      forumFetch: $forumFetch,
    },
  };
});

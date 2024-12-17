import type { UseFetchOptions } from '#app';

export const useForumFetch = <T>(url: string | (() => string), options: UseFetchOptions<T> = {}) =>
  useFetch(url, { ...options, $fetch: useNuxtApp().$forumFetch });

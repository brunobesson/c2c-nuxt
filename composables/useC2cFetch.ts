import type { UseFetchOptions } from '#app';

export const useC2cFetch = <T>(url: string | (() => string), options: UseFetchOptions<T> = {}) =>
  useFetch(url, { ...options, $fetch: useNuxtApp().$c2cFetch });

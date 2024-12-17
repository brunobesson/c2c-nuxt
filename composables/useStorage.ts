/**
 * A wrapper for Nuxt3 `useState` which allows the data
 * to be saved in browser's `localStorage` as JSON.
 * The API is the same as `useState`.
 *
 * @param key A string key
 * @param defaultValue Optional default value of the key
 */
export const useStorage = <T>(
  key: string,
  defaultValue?: () => T | undefined
): Ref<T | undefined> => {
  const state = useState<T | undefined>(key, defaultValue);

  // Keep the keys so there are no duplicate watch-ers.
  // The keys also should be only on the client side.
  let keys = ref(new Set<string>());
  if (import.meta.client && localStorage) {
    keys = useState<Set<string>>('useStorage-keys', () => new Set<string>());
    const raw = localStorage.getItem(key);
    if (!raw) {
      state.value = undefined;
    } else {
      try {
        state.value = JSON.parse(raw);
      } catch (e) {}
    }
  }

  // Watch only if there are no other watchers
  if (!keys.value.has(key)) {
    watch(state, (newValue) => {
      if (import.meta.client && localStorage) {
        if (newValue === undefined) {
          // clear the state
          keys.value.delete(key);
          try {
            localStorage.removeItem(key);
          } catch (e) {}
        } else {
          // set state
          keys.value.add(key);
          try {
            localStorage.setItem(key, JSON.stringify(state.value));
          } catch (e) {}
        }
      }
    });
  }

  return state;
};

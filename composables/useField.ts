export const useField = (value: unknown) => {
  const hasValue = computed(() => value !== undefined && value !== null && (!Array.isArray(value) || value.length));

  return { hasValue };
};

export const useHomePage = () => {
  const route = useRoute();
  const isHomePage = computed(() => ['/', '/home'].includes(route.path));

  return { isHomePage };
};

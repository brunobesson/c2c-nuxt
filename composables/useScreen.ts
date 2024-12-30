export const useScreen = () => {
  const { BREAKPOINT_MOBILE, BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_WIDESCREEN } = useBreakpoints();
  const widthQueries = [BREAKPOINT_MOBILE, BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_WIDESCREEN].map(
    breakpoint => useMediaQuery(`only screen and (max-width: ${breakpoint}px)`),
  );

  const widthMatchingIndex = computed(() => widthQueries.findIndex(query => query.value === true));
  const isMobile = computed(() => widthMatchingIndex.value === 0);
  const isTablet = computed(() => widthMatchingIndex.value === 1);
  const isDesktop = computed(() => widthMatchingIndex.value === 2);
  const isWidescreen = computed(() => widthMatchingIndex.value === 3);
  const isFullHD = computed(() => widthMatchingIndex.value === -1);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen,
    isFullHD,
  };
};

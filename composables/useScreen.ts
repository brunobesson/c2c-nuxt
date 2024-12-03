const BREAKPOINT_MOBILE = 768;
const BREAKPOINT_TABLET = 1023;
const BREAKPOINT_DESKTOP = 1215;
const BREAKPOINT_WIDESCREEN = 1407;

export const useScreen = () => {
  const widthQueries = [
    BREAKPOINT_MOBILE,
    BREAKPOINT_TABLET,
    BREAKPOINT_DESKTOP,
    BREAKPOINT_WIDESCREEN,
  ].map((breakpoint) =>
    useMedia(`only screen and (max-width: ${breakpoint}px)`)
  );

  const widthMatchingIndex = computed(() =>
    widthQueries.findIndex((query) => query.value === true)
  );
  const isMobile = computed(() => widthMatchingIndex.value === 0);
  const isTablet = computed(() => widthMatchingIndex.value === 1);
  const isDesktop = computed(() => widthMatchingIndex.value === 2);
  const isWidescreen = computed(() => widthMatchingIndex.value === 3);
  const isFullHD = computed(() => widthMatchingIndex.value === -1);

  const hasHeightForAd = useMedia('only screen and (min-height: 630px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen,
    isFullHD,
    hasHeightForAd,
  };
};

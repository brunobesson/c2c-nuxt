<template>
  <div
    ref="root"
    id="app"
    :class="{ home: isHomePage, 'no-nav-ad': isMobile || isTablet || isDesktop }"
    data-allow-mismatch="class">
    <SideMenu
      class="fixed w-[--sidemenu-width] h-screen top-0 z-30 transition-[left] duration-300 max-tablet:left-[calc(-1*var(--sidemenu-width))] print:hidden"
      :class="{ '!left-0': alternativeSideMenu }" />
    <Navigation
      class="fixed top-0 left-0 right-0 z-[25] tablet:ml-[--sidemenu-width] print:hidden"
      @toggle-side-menu="alternativeSideMenu = !alternativeSideMenu" />
    <LoadingIndicator />
    <!-- TODO -->
    <!-- <AdDfmLarge
      v-if="!isHomePage && (isMobile || isTablet || isDesktop)"
      class="ml-0 pt-[--navbar-height] tablet:ml-[--sidemenu-width] print:hidden" /> -->
    <HomeSiteNotice
      class="absolute top-[--navbar-height] w-full z-20 shadow-md tablet:ml-[--sidemenu-width] tablet:w-[calc(100%-var(--sidemenu-width))] print:hidden" />
    <div
      v-if="alternativeSideMenu"
      class="fixed top-0 left-0 z-[28] w-screen h-screen bg-black/20"
      @click="alternativeSideMenu = false" />

    <div
      class="page-content min-h-screen flex flex-col pt-[--navbar-height] tablet:ml-[--sidemenu-width] bg-body print:block print:pt-0 print:bg-white">
      <slot />
    </div>

    <GdprBanner />
  </div>
</template>

<script setup lang="ts">
const { isMobile, isTablet, isDesktop } = useScreen();

const { isHomePage } = useHomePage();

const root = useTemplateRef('root');
const { BREAKPOINT_MOBILE, BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_WIDESCREEN } = useBreakpoints();

useResizeObserver(root, updateWidth);

onMounted(() => {
  updateWidth();
});

function updateWidth() {
  if (!root.value) {
    return;
  }
  // TODO
  // allows reactive css when body width changes because map is pinned
  // (unlike the css @media(max-width) this is replacing)

  const width = root.value.offsetWidth;
  if (width <= BREAKPOINT_MOBILE) {
    root.value.dataset.width = 'mobile';
  } else if (width <= BREAKPOINT_TABLET) {
    root.value.dataset.width = 'tablet';
  } else if (width <= BREAKPOINT_DESKTOP) {
    root.value.dataset.width = 'desktop';
  } else if (width <= BREAKPOINT_WIDESCREEN) {
    root.value.dataset.width = 'widescreen';
  } else {
    root.value.dataset.width = 'fullhd';
  }
}

const route = useRoute();

const alternativeSideMenu = ref(false);

watch(route, hideSideMenuOnMobile);

function hideSideMenuOnMobile() {
  alternativeSideMenu.value = false;
}
</script>

<style lang="css">
.home,
.no-nav-ad {
  --navbar-height: var(--navbar-height-no-ad);
}
</style>

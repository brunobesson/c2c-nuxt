<template>
  <nav
    class="is-size-5"
    :class="{
      'with-ad': isHomePage && !isMobile && !isTablet && !isDesktop,
    }"
  >
    <div class="navigation-item">Bruno</div>
  </nav>
</template>

<script setup lang="ts">
const { isHomePage } = useHomePage();
const { isMobile, isTablet, isDesktop } = import.meta.client
  ? useScreen()
  : { isMobile: ref(false), isTablet: ref(false), isDesktop: ref(false) };
</script>

<style lang="scss">
nav {
  max-width: 100vw;
  height: $navbar-height;
  background-color: var(--bulma-white);
  box-shadow: 0 2px 0 $color-base-c2c;
  display: flex;
}
</style>

<template>
  <div
    id="app"
    :class="{
      'nav-dfm': !isHomePage && !isMobile && !isTablet && !isDesktop,
      'home-topoguide': isHomePage,
    }"
  >
    <SideMenu
      class="side-menu no-print"
      :class="{ 'alternative-side-menu': alternativeSideMenu }"
    />
    <Navigation
      class="navigation no-print"
      @toggle-side-menu="alternativeSideMenu = !alternativeSideMenu"
    />
    <DfmAdLarge
      v-if="!isHomePage && (isMobile || isTablet || isDesktop)"
      class="ad"
    />
    <SiteNotice ref="siteNotice no-print" class="no-print site-notice" />
    <div
      v-if="alternativeSideMenu"
      class="alternative-side-menu-shader"
      @click="alternativeSideMenu = false"
    />

    <div class="page-content is-block-print">
      <NuxtPage />
    </div>
    <GdprBanner />
  </div>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead();
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    dir: i18nHead.value.htmlAttrs!.dir,
  },
}));
useSeoMeta({ title: 'Camptocamp.org', ogTitle: 'Camptocamp.org' }); // TODO

const { isMobile, isTablet, isDesktop } = import.meta.client
  ? useScreen()
  : { isMobile: ref(false), isTablet: ref(false), isDesktop: ref(false) };
const route = useRoute();
const alternativeSideMenu = ref(false);
const { isHomePage } = useHomePage();

onMounted(() => {
  // TODO document.getElementById('splashscreen').style.display = 'none';
});

watch(route, hideSideMenuOnMobile);

function hideSideMenuOnMobile() {
  alternativeSideMenu.value = false;
}
</script>

<style lang="scss">
$body-height: calc(100vh - #{$navbar-height});

html {
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

html,
body,
#app {
  min-height: $body-height;
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 25;
}

.side-menu {
  width: $sidemenu-width;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: 30;
  transition: 0.3s;
}

.alternative-side-menu-shader {
  z-index: 29;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
}

.site-notice {
  position: absolute;
  top: $navbar-height;
  width: 100%;
  z-index: 20;
  box-shadow: 0 5px 10px 0px rgba(10, 10, 10, 0.5);
}

.page-content {
  min-height: 100vh;
  display: flex;
  flex-flow: column;
}

.home-topoguide {
  .page-content {
    padding-top: $navbar-height;
  }

  .ams-ad {
    margin-left: auto !important;
    padding-top: 0px !important;
  }
}

.nav-dfm {
  $body-height-ad: calc(100vh - #{$navbarad-height});

  html,
  body,
  #app {
    min-height: $body-height-ad;
  }

  .site-notice {
    top: $navbarad-height;
  }

  .page-content {
    padding-top: $navbarad-height;
  }
}

@media screen {
  [data-width='mobile'] {
    .side-menu {
      left: -$sidemenu-width;
    }

    .alternative-side-menu {
      left: 0;
    }

    .page-content,
    .ad {
      margin-left: 0;
    }
    .ad {
      padding-top: $navbar-height;
    }

    .section {
      padding: 0.75rem !important;
    }

    .box:not(:last-child),
    .feed-card {
      margin-bottom: 0.75rem !important;
    }
  }

  [data-width='tablet'] {
    .side-menu {
      left: -$sidemenu-width;
    }

    .alternative-side-menu {
      left: 0;
    }

    .page-content,
    .ad {
      margin-left: 0;
    }

    .ad {
      padding-top: $navbar-height;
    }
  }

  [data-width='desktop'] {
    .side-menu {
      left: 0;
    }
    .page-content,
    .ad {
      margin-left: $sidemenu-width;
    }

    .ad {
      padding-top: $navbar-height;
    }

    .site-notice {
      padding-left: $sidemenu-width;
    }
  }
}

@media print {
  .page-content {
    padding-top: 0;
  }

  html {
    font-size: 12px !important;
  }
}
</style>

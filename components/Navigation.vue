<template>
  <nav
    class="is-size-5"
    :class="{
      'with-ad': isHomePage && !isMobile && !isTablet && !isDesktop,
    }"
  >
    <span
      v-if="isMobile || isTablet"
      class="navigation-item"
      :class="{ 'is-hidden-mobile': !hideSearchInput }"
      @click="$emit('toggle-side-menu')"
    >
      <span class="button">
        <FaIcon icon="bars" />
      </span>
    </span>

    <NuxtLink
      v-if="isMobile || isTablet"
      to="/"
      class="navigation-item navigation-brand has-text-centered"
      :class="{ 'is-hidden-mobile': !hideSearchInput }"
    >
      <img src="~/assets/img/logo.svg" alt="Camptocamp.org" />
    </NuxtLink>

    <DfmAdLarge v-if="!isHomePage && !isMobile && !isTablet && !isDesktop" />

    <div class="navigation-end">
      <NuxtLink
        to="/articles/106732"
        class="navigation-item has-text-centered"
        :class="{ 'is-hidden-mobile': !hideSearchInput }"
      >
        <IconHelp fixed-width />
        <span class="is-hidden-mobile is-capitalized">
          {{ $t('Help') }}
        </span>
      </NuxtLink>
      <!-- TODO -->
      <div class="navigation-item search-input">Search input</div>
      <div class="navigation-item">
        <LinkJoinUs
          class="has-text-centered button"
          :class="{ 'is-hidden-mobile': !hideSearchInput }"
        >
          <IconJoinUs fixed-width />
          <span class="is-hidden-mobile is-capitalized">{{
            $t('Join us')
          }}</span>
        </LinkJoinUs>

        <div class="navigation-item">
          <DropdownButton class="is-right add-button">
            <template #trigger>
              <button class="button is-success">
                <FaIcon icon="plus" />
              </button>
            </template>
            <LinkAdd
              v-for="documentType of [
                'outing',
                'route',
                'waypoint',
                'article',
                'book',
                'xreport',
              ]"
              :key="documentType"
              :document-type="documentType"
              class="dropdown-item is-size-5 is-ellipsed"
            >
              <IconDocument :type="documentType" fixed-width />
              <span>TODO</span>
            </LinkAdd>
          </DropdownButton>
        </div>

        <div class="navigation-item">
          <FaIcon icon="plus" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isHomePage } = useHomePage();
const { isMobile, isTablet, isDesktop } = import.meta.client
  ? useScreen()
  : { isMobile: ref(false), isTablet: ref(false), isDesktop: ref(false) };

const hideSearchInput = ref(true); // only on small screen
</script>

<style lang="scss">
nav {
  max-width: 100vw;
  height: $navbar-height;
  background-color: var(--bulma-white);
  box-shadow: 0 2px 0 $color-base-c2c;
  display: flex;
}

.navigation-brand {
  padding: 4px 5px !important;
  img {
    height: calc(#{$navbar-height} - 8px);
  }
}

.navigation-end {
  justify-content: flex-end;
  margin-left: auto;
  display: flex;
}

.navigation-item {
  display: flex;
  align-items: center;
  line-height: 1.5;
}

@include mixins.mobile {
  .add-button .dropdown-content {
    position: fixed;
    right: 0;
    max-width: 100%;
  }
}
</style>

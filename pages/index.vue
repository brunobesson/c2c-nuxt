<template>
  <div class="p-5">
    <div class="columns">
      <div
        class="column is-12-mobile"
        :class="feed ? 'is-7-tablet is-7-desktop is-8-widescreen is-9-fullhd' : 'is-7 is-8-fullhd'">
        <!-- Association and website introduction -->
        <div class="box intro">
          <div class="feed-title has-cursor-pointer">
            <span class="title is-4" :class="{ 'is-marginless': !banner }">
              {{ $t('home.intro') }}
            </span>
            <Icon
              class="is-size-6 no-print accordion-icon mt-2"
              icon="angle-down"
              :rotation="banner ? 180 : undefined"
              @click="banner = !banner" />
          </div>
          <HomeBanner v-show="banner" />
        </div>
        <HomeBoardAnnoucement v-if="isMobile" />
        <AdDfmSmall v-if="isMobile" />
        <!-- Switchs -->
        <div class="field">
          <span>
            <label class="toggle-container">
              <span :class="[feed ? '' : 'is-active']" @click="feed = false">
                {{ $t('home.activate-dashboard') }}
              </span>
              <span :class="[feed ? 'is-active' : '']" @click="feed = true">
                {{ $t('home.activate-feed') }}
              </span>
            </label>
          </span>
          <span class="preference-switch">
            <span v-if="authenticated">
              <input
                id="c2c-personal-feed"
                :class="{ 'switch is-rtl is-rounded': !isMobile }"
                type="checkbox"
                v-model="isPersonal"
                @click="isPersonal = !isPersonal" />
              <label
                for="c2c-personal-feed"
                :title="isPersonal ? $t('home.feed.personal.on') : $t('home.feed.personal.off')">
                <span>{{ $t('home.activate-preferences') }}</span>
              </label>
            </span>
            <NuxtLink to="preferences" class="has-text-normal" :title="$t('navigation.preferences')">
              <Icon icon="gears" />
            </NuxtLink>
          </span>
        </div>
        <!-- Feed/Dashboard -->
        <div class="feed-view" v-if="feed">
          <HomeFeed :type="isPersonal && authenticated ? 'personal' : 'default'" hide-empty-documents />
        </div>
        <div v-if="!feed">
          <HomeImagesGallery v-if="!isMobile" />
          <HomeOutingsList :is-personal="isPersonal ?? false" />
          <HomeImagesGallery v-if="isMobile" />
          <HomeRoutesList />
          <HomeArticlesList v-if="isMobile" />
          <HomeLinks v-if="isMobile" />
          <HomeForum :message-count="20" v-if="isMobile" />
        </div>
      </div>
      <div
        v-if="!isMobile"
        class="column"
        :class="feed ? 'is-5-tablet is-5-desktop is-4-widescreen is-3-fullhd' : 'is-5 is-4-fullhd'">
        <HomeBoardAnnoucement />
        <AdDfmSmall />
        <HomeLinks />
        <HomeForum :message-count="20" />
        <HomeArticlesList v-if="!feed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

const { isMobile } = import.meta.client ? useScreen() : { isMobile: true };
const config = useCookie('home.config', {
  default: () => ({ feed: true, banner: true, personal: false }),
});
const { feed, banner, personal } = config.value;
const { authenticated } = storeToRefs(useAuthStore());
const isPersonal = computed(() => authenticated.value && personal);
</script>

<style lang="scss" scoped>
@include mixins.mobile {
  .feed-view {
    padding-left: 0;
    padding-right: 0;

    .feed-title {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .field {
    flex-direction: column;
  }

  .preference-switch {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    display: flex;

    & > span {
      display: flex;
      flex-direction: row-reverse;

      & > * {
        margin-right: 0.3rem;
      }
    }
  }
}

@include mixins.tablet {
  .feed-view {
    margin-top: var(--bulma-size-3);
  }

  .field {
    justify-content: space-between;
    align-items: baseline;
  }
}

.feed-title {
  display: flex;

  span:first-child {
    flex-grow: 1;
  }
}

.intro {
  margin-bottom: var(--bulma-size-6);
}

.switch[type='checkbox']:checked + label::before {
  background: $color-base-c2c;
}

.toggle-checkbox {
  display: none;
}

.toggle-container {
  position: relative;
  border-radius: 20px;
  background: white;
  border: 1px solid $color-base-c2c;
  padding: 5px 2px;
  cursor: pointer;
}

.is-active {
  color: white;
  border-radius: 20px;
  background: $color-base-c2c;
  transition: color 0.3s;
}

.toggleContainer span {
  padding: 3px 10px;
  text-align: center;
  z-index: 100;
}

.field {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ams-ad {
  margin-bottom: var(--bulma-size-7);
}
</style>

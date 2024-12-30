<template>
  <main class="home-layout" :class="{ feed: config.feed }">
    <div class="flex flex-col gap-5">
      <HomeBanner class="order-1" />
      <!-- TODO fallback + deffered from prime? -->
      <ClientOnly v-if="isMobile">
        <HomeBoardAnnoucement class="order-2" />
      </ClientOnly>
      <ClientOnly v-if="isMobile">
        <AdDfmSmall class="order-3" />
      </ClientOnly>
      <ClientOnly>
        <div class="flex items-center order-4">
          <SelectButton
            v-model="config.feed"
            :options="feedOptions"
            :optionLabel="option => $t(option.text)"
            :optionValue="option => option.value"
            :pt="{
              root: {
                class: 'border border-primary rounded-full',
              },
              pcToggleButton: {
                root: {
                  class:
                    '!rounded-full !rounded-s-full bg-transparent border-none before:shadow-none before:!rounded-full before:[&.p-togglebutton-checked]:bg-primary [&.p-togglebutton-checked]:text-white',
                },
              },
            }" />
          <span class="grow flex justify-end items-center gap-2">
            <span v-if="authenticated" class="flex items-center gap-1">
              <label
                for="c2c-personal-feed"
                :title="isPersonal ? $t('home.feed.personal.on') : $t('home.feed.personal.off')">
                {{ $t('home.activate-preferences') }}
              </label>
              <ToggleSwitch v-model="config.personal" id="c2c-personal-feed" />
            </span>
            <NuxtLink to="preferences" class="has-text-normal" :title="$t('navigation.preferences')">
              <Icon icon="gears" />
            </NuxtLink>
          </span>
        </div>
      </ClientOnly>
      <ClientOnly v-if="config.feed">
        <HomeFeed class="order-5" />
      </ClientOnly>
      <ClientOnly>
        <HomeOutingsList v-if="!config.feed" :is-personal="isPersonal" class="order-6" />
      </ClientOnly>
      <ClientOnly v-if="!config.feed">
        <HomeImagesGallery class="order-7 mobile:order-5" />
      </ClientOnly>
      <ClientOnly v-if="!config.feed">
        <HomeRoutesList class="order-8" />
      </ClientOnly>
      <ClientOnly v-if="!config.feed && isMobile">
        <HomeArticlesList class="order-8" />
      </ClientOnly>
      <ClientOnly v-if="!config.feed && isMobile">
        <HomeLinks class="order-9" />
      </ClientOnly>
      <ClientOnly v-if="!config.feed && isMobile">
        <HomeForum :message-count="20" class="order-10" />
      </ClientOnly>
    </div>
    <div v-if="!isMobile" class="flex flex-col gap-5">
      <ClientOnly>
        <HomeBoardAnnoucement />
      </ClientOnly>
      <ClientOnly>
        <div class="grid place-content-center">
          <AdDfmSmall />
        </div>
      </ClientOnly>
      <ClientOnly>
        <HomeLinks />
      </ClientOnly>
      <ClientOnly>
        <HomeForum :message-count="20" />
      </ClientOnly>
      <ClientOnly>
        <HomeArticlesList />
      </ClientOnly>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

const { isMobile } = import.meta.client ? useScreen() : { isMobile: true };
const config = useCookie('home.config', {
  default: () => ({ feed: true, banner: true, personal: false }),
});
const { authenticated } = storeToRefs(useAuthStore());
const isPersonal = computed(() => authenticated.value && config.value.personal);

const feedOptions = ref([
  { text: 'home.activate-dashboard', value: false },
  { text: 'home.activate-feed', value: true },
]);
</script>

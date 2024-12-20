<template>
  <main class="p-5">
    <HomeBanner />
    <ClientOnly>
      <HomeBoardAnnoucement v-if="isMobile" />
      <AdDfmSmall v-if="isMobile" />
    </ClientOnly>
    <div class="flex items-center">
      <SelectButton
        v-model="config.feed"
        :options="feedOptions"
        :optionLabel="option => $t(option.text)"
        :optionValue="option => option.value" />
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
    <HomeFeed v-if="config.feed" />
    <template v-else>
      <!-- TODO clientonly ? -->
      <HomeImagesGallery v-if="!isMobile" />
      <HomeOutingsList :is-personal="isPersonal" />
      <!-- TODO could use order to have a single one-->
      <HomeImagesGallery v-if="isMobile" />
      <HomeRoutesList />
      <HomeArticlesList v-if="isMobile" />
      <HomeLinks v-if="isMobile" />
      <HomeForum :message-count="20" v-if="isMobile" />
    </template>
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

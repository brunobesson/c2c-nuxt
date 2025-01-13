<template>
  <main class="home-layout" :class="{ feed: config.feed }">
    <div class="flex flex-col gap-5">
      <HomeBanner />
      <HomeBoardAnnoucement :data="announcement" class="order-2 mobile:hidden" />
      <AdDfmSmall class="order-3 mobile:hidden" />
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
      <HomeFeed v-if="config.feed" :type="isPersonal && authenticated ? 'personal' : 'default'" class="order-5" />
      <HomeOutingsList v-if="!config.feed" :is-personal="isPersonal" class="order-6" />
      <HomeImagesGallery v-if="!config.feed" class="order-7 mobile:order-5" />
      <HomeRoutesList v-if="!config.feed" class="order-8" />
      <HomeArticlesList
        v-if="!config.feed"
        :data="latestArticles"
        :status="latestArticlesStatus"
        class="order-8 mobile:hidden" />
      <HomeLinks v-if="!config.feed" class="order-9 mobile:hidden" />
      <HomeForum
        v-if="!config.feed"
        :message-count="20"
        :data="latestPosts"
        :status="latestPostsStatus"
        class="order-10 mobile:hidden" />
    </div>
    <div class="flex flex-col gap-5 max-mobile:hidden">
      <HomeBoardAnnoucement :data="announcement" />
      <div class="grid place-content-center">
        <AdDfmSmall />
      </div>
      <HomeLinks />
      <HomeForum :message-count="20" :data="latestPosts" :status="latestPostsStatus" />
      <HomeArticlesList :data="latestArticles" :status="latestArticlesStatus" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

const config = useCookie('home.config', {
  default: () => ({ feed: true, banner: true, personal: false }),
});
const { authenticated } = storeToRefs(useAuthStore());
const isPersonal = computed(() => authenticated.value && config.value.personal);

const feedOptions = ref([
  { text: 'home.activate-dashboard', value: false },
  { text: 'home.activate-feed', value: true },
]);

const { data: announcement } = useAsyncData(() => useForumApi().getBoardAnnouncement());

// We fetch data from the home page for some components because they need to be duplicated to respect the layout betwwen
// mobile and other breakpoints
const { getLatest } = useForumApi();
const { data: latestPosts, status: latestPostsStatus } = useAsyncData(() => getLatest());
const { data: latestArticles, status: latestArticlesStatus } = await useAsyncData(() =>
  useC2cApi().article.getAll({ limit: 5, qa: 'draft,great' }),
);
</script>

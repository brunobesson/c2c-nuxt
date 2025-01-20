<template>
  <NuxtLayout>
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-semibold py-8">{{ $t('error-page.title') }}</h1>
      <template v-if="error?.statusCode !== 404">
        <h2 class="text-2xl font-semibold pb-4">{{ $t('error-page.default.subtitle') }}</h2>
        <p>{{ $t('error-page.default.details') }}</p>
      </template>
      <template v-else>
        <h2 class="text-2xl font-semibold pb-4">{{ $t('error-page.404.subtitle') }}</h2>
        <p class="pb-4">{{ $t('error-page.404.details') }}</p>
      </template>
      <i18n-t keypath="error-page.alternatives" tag="p" class="pb-4">
        <a @click="handleError" class="link">{{ $t('error-page.back') }}</a>
      </i18n-t>
      <div class="flex flex-wrap justify-center max-w-[600px] m-auto">
        <NuxtLink
          to="/"
          class="w-1/3 py-6 flex flex-col items-center font-semibold transition-colors duration-300 hover:bg-hover">
          <Icon icon="home" class="text-5xl text-primary" />
          <span class="text-center text-xl font-semibold">{{ $t('link.home') }}</span>
        </NuxtLink>
        <NuxtLink
          v-for="type in docTypes"
          :to="`/${type}s`"
          class="w-1/3 py-6 flex flex-col items-center font-semibold transition-colors duration-300 hover:bg-hover">
          <IconDocument :type="type" class="text-5xl text-primary" />
          <span class="text-center text-xl font-semibold">{{ capitalize($t(`${type}s`)) }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="grid place-content-center mb-20">
      <img
        src="~/assets/img/falling.svg"
        class="max-w-96 transition-transform duration-1000 ![animation-duration:10s] [animation-play-state:paused] animate-spin hover:[animation-play-state:running]" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { DOCUMENT_TYPES } from './api/c2c.js';

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });

const docTypes: (typeof DOCUMENT_TYPES)[number][] = [
  'outing',
  'waypoint',
  'route',
  'article',
  'book',
  'xreport',
  'image',
  'area',
];
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>

<script setup lang="ts">
import { provideSSRWidth } from '@vueuse/core';

// set default size for SSR rendering
const { BREAKPOINT_MOBILE } = useBreakpoints();
provideSSRWidth(BREAKPOINT_MOBILE - 1);

const { locale } = useI18n();

onMounted(() => {
  const { setPrimeUiLang } = useLang();
  setPrimeUiLang(locale.value);
});

const i18nHead = useLocaleHead();
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    dir: i18nHead.value.htmlAttrs!.dir,
  },
}));
useSeoMeta({ title: 'Camptocamp.org', ogTitle: 'Camptocamp.org' }); // TODO
</script>

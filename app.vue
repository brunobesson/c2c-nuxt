<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
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

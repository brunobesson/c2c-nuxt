<template>
  <NuxtLink :to="{ name: `${documentType}-add`, params: { lang }, query }" rel="nofollow">
    <slot> {{ $t(`link.add.${documentType}`) }} </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { requiredDocumentTypeProps } from '~/props/required-document-type.js';

const { query } = defineProps({
  query: { type: Object, default: null },
  ...requiredDocumentTypeProps,
});

const { locale } = useI18n();
const lang = computed(() => useLang().apiLang(locale.value));
</script>

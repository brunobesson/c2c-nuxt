<template>
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import type { UiLang } from '../api/lang.js';
import { requiredDocumentProps } from '../props/required-document.js';

const { document, uppercaseFirstLetter } = defineProps({
  uppercaseFirstLetter: { type: Boolean, default: false },
  ...requiredDocumentProps,
});

const { documentTitle } = useDocument(document);
const { params } = useRoute();
const title = computed(() => {
  let s = documentTitle(params.lang as UiLang);
  if (uppercaseFirstLetter) {
    s = capitalize(s);
  }
  return s;
});
</script>

<template>
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import type { Document, DocumentListing } from '~/api/c2c.js';
import type { UiLang } from '~/api/lang.js';
import type { VersionedDocument } from '~/types/common.js';

const { document, uppercaseFirstLetter = false } = defineProps<{
  document: Document | DocumentListing | VersionedDocument;
  uppercaseFirstLetter?: boolean;
}>();

const { documentTitle } = useDocument(document);
const { params } = useRoute();
const { apiLang } = useLang();
const title = computed(() => {
  let s = documentTitle(apiLang(params.lang as UiLang));
  if (uppercaseFirstLetter) {
    s = capitalize(s);
  }
  return s;
});
</script>

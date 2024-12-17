<template>
  <NuxtLink
    :to="{ path: `/${documentType}/${document.document_id}/${lang}` }"
    :target="target"
    :title="documentTitle(document, lang)">
    <slot>
      <DocumentTitle :document="document" :uppercase-first-letter="uppercaseFirstLetter" />
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { requiredDocumentProps } from '../../props/required-document.js';

defineProps({
  lang: { type: String, default: null },
  uppercaseFirstLetter: { type: Boolean, default: false },
  target: { type: String, default: undefined },
  ...requiredDocumentProps,
});

const { documentType, documentTitle } = useDocument();
</script>

<template>
  <NuxtLink
    :to="{ path: `/${documentType}/${document.document_id}${lang ? '/' + lang : ''}` }"
    :target="target"
    :title="documentTitle(lang)">
    <slot>
      <DocumentTitle :document="document" :uppercase-first-letter="uppercaseFirstLetter" />
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { requiredDocumentProps } from '../../props/required-document.js';

const { document } = defineProps({
  lang: { type: String, default: null },
  uppercaseFirstLetter: { type: Boolean, default: false },
  target: { type: String, default: undefined },
  ...requiredDocumentProps,
});

const { documentType, documentTitle } = useDocument(document);
</script>

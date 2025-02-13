<template>
  <NuxtLink
    :to="{ path: `/${documentType}s/${document.document_id}${lang ? '/' + lang : ''}` }"
    :target="target"
    :title="documentTitle(lang)">
    <slot>
      <DocumentTitle :document="document" :uppercase-first-letter="uppercaseFirstLetter" />
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Document, DocumentListing } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';
import type { VersionedDocument } from '../../types/common.js';

const { document, uppercaseFirstLetter = false } = defineProps<{
  document: Document | DocumentListing | VersionedDocument;
  lang?: ApiLang;
  uppercaseFirstLetter?: boolean;
  target?: string;
}>();

const { documentType, documentTitle } = useDocument(document);
</script>

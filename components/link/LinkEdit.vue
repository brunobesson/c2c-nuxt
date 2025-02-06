<template>
  <NuxtLink :to="{ name: `${documentType}-edit`, params: { id: document.document_id, lang } }" rel="nofollow">
    <slot>{{ $t('link.edit') }}</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Document } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';

const { document, lang } = defineProps<{ document: Document; lang: ApiLang }>();
const { documentType } = useDocument(document);
</script>

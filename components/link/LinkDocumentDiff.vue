<template>
  <NuxtLink :to="{ name: documentType + '-diff', params: { id, versionFrom, versionTo, lang } }" />
</template>

<script setup lang="ts">
import type { DocumentType } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';

defineProps<{
  documentType: DocumentType;
  lang: ApiLang;
  id: number;
  versionFrom: number;
  versionTo: number | 'last';
}>();
</script>

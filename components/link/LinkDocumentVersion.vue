<template>
  <NuxtLink v-if="documentType !== 'profile'" :to="{ name: documentType + '-version', params: { id, version, lang } }">
    <slot />
  </NuxtLink>
  <span v-else><slot /></span>
</template>

<script setup lang="ts">
import type { DocumentType } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';

defineProps<{ documentType: DocumentType; version: number; lang: ApiLang; id: number }>();
</script>

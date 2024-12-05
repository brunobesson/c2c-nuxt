<template>
  <!-- TODO -->
  <NuxtLink :to="documentType + '-add'" rel="nofollow">
    <slot> TODO </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { requiredDocumentTypeProps } from '~/props/required-document-type.js';

defineProps({
  query: { type: Object, default: null },
  ...requiredDocumentTypeProps,
});

const getApiLang = 'fr'; // TODO
</script>

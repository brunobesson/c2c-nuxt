<template>
  <span :title="capitalize($t(documentType))">
    <IconDocument :type="documentType" />
  </span>
</template>

<script setup lang="ts">
import type { DocumentType } from '../../api/c2c.js';

defineProps<{
  documentType: DocumentType;
}>();
</script>

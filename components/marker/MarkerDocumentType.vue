<template>
  <span :title="capitalize($t(documentType))">
    <IconDocument :type="documentType" />
  </span>
</template>

<script setup lang="ts">
import { requiredDocumentTypeProps } from '../../props/required-document-type.js';

defineProps(requiredDocumentTypeProps);
</script>

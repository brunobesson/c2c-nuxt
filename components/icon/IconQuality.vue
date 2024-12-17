<template>
  <FaIcon :icon="['quality', quality]" :fixed-width="fixedWidth" />
</template>

<script setup lang="ts">
import { fixedWidthProps } from '~/props/fixed-width.js';

defineProps({ quality: { type: String, required: true }, ...fixedWidthProps });
</script>

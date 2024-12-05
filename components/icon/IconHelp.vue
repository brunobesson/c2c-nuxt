<template>
  <FaIcon icon="info-circle" :fixed-width="fixedWidth" />
</template>

<script lang="ts" setup>
import { fixedWidthProps } from '~/props/fixed-width.js';

defineProps(fixedWidthProps);
</script>

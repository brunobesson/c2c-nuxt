<template>
  <fa-icon :icon="['quality', quality]" :fixed-width="fixedWidth" />
</template>

<script setup lang="ts">
import type { QualityType } from '../../api/c2c.js';

const { fixedWidth = false } = defineProps<{
  fixedWidth?: boolean;
  quality: QualityType;
}>();
</script>

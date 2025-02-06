<template>
  <span :title="capitalize($t('colon', { before: $t('quality'), after: $t(`quality-values.${quality}`) }))">
    <IconQuality :quality="quality" />
  </span>
</template>

<script setup lang="ts">
import type { QualityType } from '../../api/c2c.js';

defineProps<{ quality: QualityType }>();
</script>

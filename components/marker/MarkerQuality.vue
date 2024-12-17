<template>
  <span :title="$t('quality') + $t('colon') + $t(quality, 'quality_types')">
    <IconQuality :quality="quality" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ quality: string }>();
</script>

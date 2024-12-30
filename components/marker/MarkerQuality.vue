<template>
  <span :title="capitalize($t('colon', [$t('quality'), $t(`quality-values.${quality}`)]))">
    <IconQuality :quality="quality" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ quality: string }>();
</script>

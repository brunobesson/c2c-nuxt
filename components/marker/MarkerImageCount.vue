<template>
  <!-- it's not a simple icon (tooltip), so do not move it in icons folder -->
  <span v-if="imageCount && imageCount > 0" :title="imageCount + ' ' + $t('images')">
    <IconDocument type="image" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ imageCount?: number }>();
</script>

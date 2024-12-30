<template>
  <Icon
    class="icon-yeti"
    icon="exclamation"
    transform="shrink-6 rotate-45"
    mask="square"
    :fixed-width="fixedWidth"
    data-allow-mismatch />
</template>

<script lang="ts" setup>
import { fixedWidthProps } from '~/props/fixed-width.js';

defineProps(fixedWidthProps);
</script>

<style lang="css" scoped>
.icon-yeti {
  transform: rotate(-45deg) scale(0.95);
}
</style>

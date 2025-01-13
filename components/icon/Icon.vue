<template>
  <span class="icon">
    <fa-icon :icon="icon" :transform="transform" :mask="mask" :fixed-width="fixedWidth" />
  </span>
</template>

<script setup lang="ts">
const { fixedWidth = false } = defineProps<{
  icon: string | string[];
  transform?: string | Record<string, any>;
  mask?: string;
  fixedWidth?: boolean;
}>();
</script>

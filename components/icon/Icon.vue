<template>
  <span class="icon">
    <FaIcon :icon="icon" :transform="transform" :mask="mask" :fixed-width="fixedWidth" />
  </span>
</template>

<script setup lang="ts">
const { fixedWidth = false } = defineProps<{
  icon: string | string[];
  transform?: string;
  mask?: string;
  fixedWidth?: boolean;
}>();
</script>

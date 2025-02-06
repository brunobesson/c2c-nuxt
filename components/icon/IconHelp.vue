<template>
  <Icon icon="info-circle" :fixed-width="fixedWidth" />
</template>

<script lang="ts" setup>
const { fixedWidth = false } = defineProps<{
  fixedWidth?: boolean;
}>();
</script>

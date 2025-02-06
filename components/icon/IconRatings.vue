<template>
  <Icon icon="tachometer-alt" :fixed-width="fixedWidth" />
</template>

<script lang="ts" setup>
const { fixedWidth = false } = defineProps<{
  fixedWidth?: boolean;
}>();
</script>

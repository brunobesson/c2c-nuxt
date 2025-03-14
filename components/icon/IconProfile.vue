<template>
  <Icon icon="user" :fixed-width="fixedWidth" />
</template>

<script lang="ts" setup>
const { fixedWidth = false } = defineProps<{
  fixedWidth?: boolean;
}>();
</script>

<template>
  <Icon icon="user-plus" :fixed-width="fixedWidth" />
</template>

<script lang="ts" setup>
const { fixedWidth = false } = defineProps<{
  fixedWidth?: boolean;
}>();
</script>

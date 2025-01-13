<template>
  <div
    class="border-b last:border-b-0 border-surface-200 px-3 py-2"
    :class="{ 'flex justify-between items-center': flex }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { flex = false } = defineProps<{ flex?: boolean }>();
</script>

<template>
  <!-- TODO styling -->
  <Panel toggleable @update:collapsed="collapsed = $event">
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <template #toggleicon>
      <Icon icon="angle-down" :transform="collapsed ? { rotate: 180 } : undefined" />
    </template>
    <slot />
  </Panel>
</template>

<script setup lang="ts">
const collapsed = ref(false);
</script>

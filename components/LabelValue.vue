<template>
  <div>
    <i18n-t keypath="colon" tag="span" class="font-semibold" scope="global">
      <template #before>{{ capitalize(label) }}</template>
    </i18n-t>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <span>
    <label :for="field" class="font-semibold scroll-mt-[--navbar-height]">{{ label || capitalize($t(field)) }}</label>
    <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
  </span>
</template>

<script setup lang="ts">
// TODO: marker helper
defineProps<{ field: string; label?: string; errorMessage: string | undefined }>();
</script>

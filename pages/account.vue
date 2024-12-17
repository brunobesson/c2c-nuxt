<template>
  <div>TODO account</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

definePageMeta({
  middleware: [
    (_from, _to) => {
      const { authenticated } = storeToRefs(useAuthStore());
      if (authenticated.value) {
        return navigateTo('/');
      }
    },
  ],
});
</script>

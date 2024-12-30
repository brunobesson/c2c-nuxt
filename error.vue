<template>
  <NuxtLayout>
    <!-- TODO -->
    <div>
      <h2>{{ error?.statusCode }}</h2>
      <p>{{ error?.message }}</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

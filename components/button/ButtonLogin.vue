<template>
  <Button class="bg-primary">
    <!-- TODO button styling -->
    <NuxtLink v-show="!authenticated" :to="{ path: '/auth', query: { redirect: path } }">
      <slot>
        {{ $t('Login') }}
      </slot>
    </NuxtLink>
  </Button>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

const { authenticated } = storeToRefs(useAuthStore());
const { path } = toRefs(useRoute());
</script>

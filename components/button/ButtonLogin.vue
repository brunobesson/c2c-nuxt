<template>
  <NuxtLink v-show="!authenticated" :to="{ path: '/auth', query: { redirect: path } }" class="button is-primary">
    <slot>
      {{ $t('Login') }}
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth.js';

const { authenticated } = storeToRefs(useAuthStore());
const { path } = toRefs(useRoute());
const redirect = ref();
</script>

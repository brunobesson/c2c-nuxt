<template>
  <NuxtLink
    v-show="!authenticated"
    :to="{ path: '/auth', query: { redirect } }"
    class="button is-primary"
  >
    <slot>
      {{ $t('Login') }}
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth.js';

const { authenticated } = storeToRefs(useAuthStore());
const redirect = ref('/');
const route = useRoute();
watch(route, (to) => (redirect.value = to.fullPath));
</script>

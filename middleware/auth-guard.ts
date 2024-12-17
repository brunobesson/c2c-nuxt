import { useAuthStore } from '~/store/auth.js';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if (!authenticated.value) {
    return navigateTo('/login');
  }
});

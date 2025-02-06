<template>
  <div class="login-view is-flex">
    <!-- TODO aussi sign in -->
    <!-- TODO error messages & all -->
    <form @submit="login">
      <div class="field">
        <label class="label">{{ $t('login.username') }}</label>
        <div class="control">
          <input class="input" type="text" autocomplete="username" v-model="username" />
          <span class="icon is-small is-left"><Icon icon="user" /></span>
        </div>
      </div>
      <div class="field">
        <label class="label">{{ $t('login.password') }}</label>
        <div class="control">
          <input class="input" type="password" autocomplete="current-password" v-model="password" />
          <span class="icon is-small is-left"><Icon icon="key" /></span>
        </div>
      </div>
      <div class="field is-grouped is-centered">
        <div class="control">
          <button type="submit" class="button is-primary" :class="{ 'is-loading': pending }">Login</button>
          <!-- TODO -->
          {{ hasError }}
        </div>
      </div>
    </form>
  </div>
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

// TODO useSeoMeta()

const { query } = useRoute();
const redirect = computed(() => query.redirect);
const { authenticate } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const username = ref('');
const password = ref('');

const pending = ref(false);
const hasError = ref<unknown>(undefined); // TODO

async function login(event: Event) {
  event.preventDefault();
  pending.value = true;
  hasError.value = undefined;
  try {
    await authenticate(username.value, password.value);
    pending.value = false;
  } catch (error: unknown) {
    hasError.value = error;
    pending.value = false;
  }

  if (authenticated.value && !hasError.value) {
    navigateTo(typeof redirect.value === 'string' ? redirect.value : '/');
  }
}
</script>

<template>
  <Message severity="error" class="data-retrieval-error m-2">
    <slot>
      <i18n-t keypath="error.message.default" scope="global">
        <a class="link" @click="router.go(0)">{{ $t('error.message.reload') }}</a>
      </i18n-t>
    </slot>
  </Message>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

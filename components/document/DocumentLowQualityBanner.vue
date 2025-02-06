<template>
  <Message class="print:hidden">
    <i18n-t keypath="low-quality.banner" scope="global">
      <LinkEdit :document="document" :lang="lang">
        {{ $t('low-quality.edit') }}
      </LinkEdit>
    </i18n-t>
  </Message>
</template>

<script setup lang="ts">
import type { Document } from '../../api/c2c.js';

const { document } = defineProps<{ document: Document }>();
const lang = computed(() => document.cooked.lang);
</script>

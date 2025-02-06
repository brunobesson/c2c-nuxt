<template>
  <NuxtLink :to="{ name: `${documentType}-add`, params: { lang }, query }" rel="nofollow">
    <slot> {{ $t(`link.add.${documentType}`) }} </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { DocumentType } from '../../api/c2c.js';
import type { Query } from '../../composables/useC2cApi.js';

defineProps<{
  query?: Query;
  documentType: DocumentType;
}>();

const { locale } = useI18n();
const lang = computed(() => useLang().apiLang(locale.value));
</script>

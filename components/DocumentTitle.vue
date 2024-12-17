<template>
  <span :class="{ 'is-capitalized': uppercaseFirstLetter }">{{ title }}</span>
</template>

<script setup lang="ts">
import { requiredDocumentProps } from '../props/required-document.js';

const { document } = defineProps({
  uppercaseFirstLetter: { type: Boolean, default: false },
  ...requiredDocumentProps,
});

const { documentTitle } = useDocument();
const { params } = useRoute();
const title = computed(() => documentTitle(document, params.lang as string));
</script>

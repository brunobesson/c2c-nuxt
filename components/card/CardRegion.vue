<template>
  <span v-if="text" class="is-ellipsed">
    <IconDocument type="area" />
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import {requiredDocumentProps} from '~/props/required-document';

const { document} = defineProps(requiredDocumentProps);

const text = computed(() => useDocument(document).sortedAreaList);
</script>

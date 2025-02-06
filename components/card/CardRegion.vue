<template>
  <span v-if="text" class="is-ellipsed">
    <IconDocument type="area" />
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import type { Document, DocumentListing } from '../../api/c2c.js';

const { document } = defineProps<{ document: Document | DocumentListing }>();

const text = computed(() => useDocument(document).sortedAreaList);
</script>

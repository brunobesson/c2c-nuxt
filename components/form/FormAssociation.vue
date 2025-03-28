<template>
  <div>
    <FormLabel :field :label :errorMessage="undefined" />
    <DocumentSearch :documentType @select="add($event)" />
    <div>
      <div v-for="(doc, idx) in docs" :key="doc.key">
        {{ doc.value.document_id }} ({{ doc.value.type }}) <Icon icon="trash" @click="remove(idx)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document, DocumentListing, DocumentType } from '~/api/c2c.js';

const { field } = defineProps<{ field: string; documentType: DocumentType; label?: string }>();

const { remove, push, fields: docs } = useFieldArray<Document | DocumentListing>(() => field);

const add = (doc: DocumentListing) => {
  if (docs.value.find(d => d.value.document_id === doc.document_id)) {
    return;
  }
  push(doc);
};
</script>

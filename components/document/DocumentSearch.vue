<template>
  <Icon icon="search" />
  <input ref="input" type="search" v-model="searchText" @focus="trigger" />
  <div v-for="(value, type) in results" :key="type">
    <div>{{ type }}</div>
    <div v-for="result of value.documents" :key="result.document_id" @mousedown="onSelectItem(result)">
      {{ result.document_id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchResults, type DocumentListing, type DocumentType } from '~/api/c2c.js';

const { documentType } = defineProps<{ documentType: DocumentType | DocumentType[] }>();

const letters = computed(() => (typeof documentType === 'string' ? [documentType] : documentType).map(documentLetter));

const api = useC2cApi();
const searchText = ref('');
const debouncedSearch = refDebounced(searchText, 300);
const results = ref<SearchResults>({});

const { trigger } = watchTriggerable(debouncedSearch, (_value, _oldValue, onCleanup) => {
  const controller = new AbortController();

  onCleanup(() => controller.abort);

  (debouncedSearch.value.length < 3
    ? Promise.resolve({} as SearchResults)
    : api.document.search({ q: debouncedSearch.value, t: letters.value, limit: 7 }, controller.signal)
  ).then(res => {
    results.value = res;
  });
});

const emit = defineEmits();

const onSelectItem = (doc: DocumentListing) => {
  emit('select', doc);
  searchText.value = '';
  trigger();
};
</script>

<template>
  <p>Sorties</p>
  <ul>
    <li v-for="outing in outings">{{ outing.document_id }}</li>
  </ul>
</template>

<script setup lang="ts">
type OutingsData = {
  documents: Outing[];
  total: number;
};
type Outing = {
  document_id: number;
};

const { data } = await useFetch<OutingsData>(
  'https://api.camptocamp.org/outings'
);
const outings = data.value?.documents;
</script>

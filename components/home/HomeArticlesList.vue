<template>
  <Box>
    <template #title>
      <NuxtLink to="/articles"> <IconDocument type="article" /> {{ capitalize($t('articles')) }} </NuxtLink>
    </template>

    <LoadDataError v-if="status === 'error'" />
    <ul v-else class="list-disc pl-4">
      <li v-for="article of data" :key="article.document_id" class="[&:nth-child(even)]:bg-gray-50">
        <LinkDocument :document="article" class="flex items-center hover:bg-gray-100" />
      </li>
    </ul>

    <template #more>
      <NuxtLink to="/articles">{{ $t('more') }}</NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts">
const { data, status } = await useAsyncData(() => useC2cApi().article.getAll({ limit: 5, qa: 'draft,great' }));
</script>

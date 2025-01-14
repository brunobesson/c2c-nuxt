<template>
  <Box>
    <template #title>
      <NuxtLink to="/articles"> <IconDocument type="article" /> {{ capitalize($t('articles')) }} </NuxtLink>
    </template>

    <LoadDataError v-if="status === 'error'" />
    <ul v-else class="list-disc pl-4">
      <li v-for="article of data" :key="article.document_id" class="[&:nth-child(even)]:bg-gray-50">
        <LinkDocument :document="article" class="flex items-center hover:bg-hover" />
      </li>
    </ul>

    <template #more>
      <NuxtLink to="/articles">{{ $t('more') }}</NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app';
import type { ArticleListing } from '../../api/c2c.js';

defineProps<{ data: ArticleListing[] | null; status: AsyncDataRequestStatus }>();
</script>

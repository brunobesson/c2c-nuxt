<template>
  <Box>
    <template #title>
      <NuxtLink
        :to="{
          path: '/routes',
          query: {
            qa: 'draft,great',
            offset: 0,
            limit: 100,
          },
        }">
        <IconDocument type="route" />
        {{ capitalize($t('routes')) }}
      </NuxtLink>
    </template>

    <LoadDataError v-if="status === 'error'" />
    <ul v-else>
      <li v-for="route of data!.documents" :key="route.document_id" class="[&:nth-child(even)]:bg-gray-50">
        <HomeRouteLink :route="route" />
      </li>
    </ul>
    <template #more>
      <NuxtLink to="/routes">
        {{ $t('more') }}
      </NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts">
const { data, status } = await useAsyncData(() => useC2cApi().route.getAll({ limit: 5, qa: 'draft,great' }));
</script>

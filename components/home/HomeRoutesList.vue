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

    <!-- TODO -->

    <template #more>
      <NuxtLink to="/routes">
        {{ $t('more') }}
      </NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts"></script>

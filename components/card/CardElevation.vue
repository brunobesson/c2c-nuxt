<template>
    <span v-if="elevation" :title="$t('card.elevation_max')">
        <Icon icon="sort-amount-up" />
      {{ elevation }}&nbsp;m
    </span>
  </template>

  <script setup lang="ts">
  defineProps<{elevation: number | null | undefined}>();
  </script>
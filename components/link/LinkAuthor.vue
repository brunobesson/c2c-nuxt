<template>
  <NuxtLink :to="{ name: 'profile', params: { id: author.user_id } }">{{ author.name }}</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ author: { name: string; user_id: number } }>();
</script>

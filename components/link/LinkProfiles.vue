<template>
  <template v-if="profiles.length">
    <IconProfile />
    <LinkDocument v-for="profile of profiles" :key="profile.document_id" :document="profile" class="comma" />
  </template>
</template>

<script setup lang="ts">
import type { ProfileListing } from '~/api/c2c.js';

defineProps<{ profiles: ProfileListing[] }>();
</script>

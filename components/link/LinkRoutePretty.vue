<template>
  <LinkDocument :document="route"> </LinkDocument>
</template>

<script setup lang="ts">
import type { RouteListing } from '~/api/c2c.js';

const { showAreas = true, showActivities = true } = defineProps<{
  route: RouteListing;
  showAreas?: boolean;
  showActivities?: boolean;
}>();
</script>

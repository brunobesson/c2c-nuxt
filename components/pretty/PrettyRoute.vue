<template>
  <span>
    <DocumentTitle :document="route" />
    <Activities :activities="route.activities" />
  </span>
</template>

<script setup lang="ts">
import type { RouteListing } from '../../api/c2c.js';

defineProps<{ route: RouteListing }>();
</script>

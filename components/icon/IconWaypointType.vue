<template>
  <Icon :icon="['waypoint', type]" :fixed-width="fixedWidth" />
</template>

<script setup lang="ts">
import type { WaypointType } from '~/api/c2c.js';

const { fixedWidth = false } = defineProps<{
  type: WaypointType;
  fixedWidth?: boolean;
}>();
</script>

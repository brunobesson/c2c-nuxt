<template>
  <Icon :icon="['waypoint', type]" :fixed-width="fixedWidth" />
</template>

<script setup lang="ts">
import type { WaypointType } from '~/api/c2c.js';
import { fixedWidthProps } from '~/props/fixed-width.js';

defineProps({ type: { type: String as PropType<WaypointType>, required: true }, ...fixedWidthProps });
</script>

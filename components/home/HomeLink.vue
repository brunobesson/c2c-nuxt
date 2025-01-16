<template>
  <LinkDocument :document="document" class="flex items-center hover:bg-hover">
    <Activities
      :activities="document.activities"
      class="shrink-0 text-2xl/7"
      :class="{ 'max-mobile:grid max-mobile:grid-cols-2': document.activities.length > 1 }" />
    <span class="grow px-1">
      <DocumentTitle :document="document" /><span v-if="rangeAreas.length !== 0">&puncsp;&bull;&puncsp;</span>
      <span v-for="(area, index) of rangeAreas" :key="area.document_id" class="italic comma"
        ><DocumentTitle :document="area"
      /></span>
    </span>
    <span class="shrink-0 text-right">
      <slot />
    </span>
  </LinkDocument>
</template>

<script setup lang="ts">
import type { OutingListing, RouteListing } from '~/api/c2c.js';

const { document } = defineProps<{ document: RouteListing | OutingListing }>();

const rangeAreas = computed(() => {
  let areas = document.areas.filter(area => area.area_type === 'range');
  if (areas.length) {
    return areas;
  }
  areas = document.areas.filter((area: any) => area.area_type === 'admin_limits');
  if (areas.length) {
    return areas;
  }
  return document.areas;
});
</script>

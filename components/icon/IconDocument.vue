<template>
  <Icon v-if="type !== 'outing'" :icon="icon" :fixed-width="fixedWidth" />
  <span class="icon" v-else data-allow-mismatch>
    <fa-layers :fixed-width="fixedWidth">
      <fa-icon class="sun" icon="sun" transform="shrink-4 up-2 left-2" spin />
      <fa-icon icon="cloud" :style="{ color: 'white' }" transform="shrink-3 flip-h left-1 down-3" />
      <fa-icon icon="cloud" transform="shrink-5 flip-h left-1 down-3" />
    </fa-layers>
  </span>
</template>

<script lang="ts" setup>
import { type DocumentType } from '~/api/c2c.js';

const { type, fixedWidth = false } = defineProps<{
  type: DocumentType;
  fixedWidth?: boolean;
}>();

const icon = computed(() => {
  switch (type) {
    case 'area':
      return 'globe-americas';
    case 'article':
      return 'newspaper';
    case 'book':
      return 'atlas';
    case 'image':
      return 'image';
    case 'map':
      return 'map';
    case 'profile':
      return 'user';
    case 'route':
      return 'route';
    case 'waypoint':
      return 'map-marker-alt';
    case 'xreport':
      return 'flag-checkered';
    default:
      return 'notdef';
  }
});
</script>

<style lang="css" scoped>
.sun {
  animation: fa-spin 30s infinite linear;
}
</style>

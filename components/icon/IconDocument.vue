<template>
  <FaIcon v-if="type !== 'outing'" :icon="icon" :fixed-width="fixedWidth" />
  <FaLayers v-else>
    <FaIcon class="sun" icon="sun" transform="shrink-4 up-2 left-2" spin />
    <FaIcon
      icon="cloud"
      :style="{ color: 'white' }"
      transform="shrink-3 flip-h left-1 down-3"
    />
    <FaIcon icon="cloud" transform="shrink-5 flip-h left-1 down-3" />
  </FaLayers>
</template>

<script lang="ts" setup>
import { fixedWidthProps } from '~/props/fixed-width.js';

const { type } = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => {
      // TODO factorize
      return (
        typeof value === 'string' &&
        [
          'area',
          'article',
          'book',
          'image',
          'map',
          'outing',
          'profile',
          'route',
          'waypoint',
          'xreport',
        ].includes(value)
      );
    },
  },
  ...fixedWidthProps,
});

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
      return undefined;
  }
});
</script>

<style lang="css" scoped>
.sun {
  animation: fa-spin 30s infinite linear;
}
</style>

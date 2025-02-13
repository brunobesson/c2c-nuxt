<template>
  <LinkDocument :document="route">
    <PrettyRoute
      :route="route"
      :show-activities="showActivities"
      :show-areas="showAreas"
      :show-orientations="showOrientations"
      :show-height-diff-difficulties="showHeightDiffDifficulties" />
  </LinkDocument>
</template>

<script setup lang="ts">
import type { RouteListing } from '~/api/c2c.js';

const {
  route,
  showAreas = true,
  showActivities = true,
  showOrientations = true,
  showHeightDiffDifficulties = true,
} = defineProps<{
  route: RouteListing;
  showAreas?: boolean;
  showActivities?: boolean;
  showOrientations?: boolean;
  showHeightDiffDifficulties?: boolean;
}>();
</script>

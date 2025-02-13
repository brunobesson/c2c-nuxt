<template>
  <!-- TODO spacing -->
  <span class="hover:bg-hover">
    <DocumentTitle :document="route" class="link" />
    <Activities v-if="showActivities" :activities="route.activities" />
    <span v-if="heightUp" :title="$t('fields.height_diff_up')"> {{ heightUp }}&#8202;m </span>
    <span v-if="heightDiff" :title="$t('fields.height_diff_difficulties')">
      {{ heightDiff }}
    </span>
    <template v-if="heightUp || heightDiff">,</template>
    <span v-if="showOrientations && route.orientations.length < 3" :title="capitalize($t('orientations'))">
      {{ route.orientations.join(', ') }}
    </span>
    <DocumentRating :fields="route" />
    <MarkerGpsTrace v-if="route.geometry.has_geom_detail" />
    <span v-if="showAreas">
      <em v-for="area in rangeAreas" :key="area.document_id">
        &hairsp;&bull;&hairsp;
        <small>
          <DocumentTitle :document="area" />
        </small>
      </em>
    </span>
  </span>
</template>

<script setup lang="ts">
import type { Activity, RouteListing } from '../../api/c2c.js';

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

const heightUp = computed(() => {
  if (intersect(route.activities, ['skitouring', 'snowshoeing', 'hiking'] as Activity[])) {
    if (route.height_diff_up) {
      return '+' + route.height_diff_up;
    }
    if (route.height_diff_down) {
      return '-' + route.height_diff_down;
    }
  }
  return undefined;
});

const heightDiff = computed(() => {
  if (!showHeightDiffDifficulties) {
    return undefined;
  }
  const isAlpinism = intersect(route.activities, [
    'snow_ice_mixed',
    'mountain_climbing',
    'rock_climbing',
    'ice_climbing',
    'skitouring',
  ] as Activity[]);
  if (heightUp && !isAlpinism) {
    return undefined;
  }
  const dd = route.height_diff_difficulties;
  if (dd || (heightUp && dd === route.height_diff_up)) {
    return undefined;
  }
  const ddstr = dd + '\u200am';
  return heightUp ? `(${ddstr})` : ddstr;
});

const rangeAreas = computed(() => route.areas.filter(a => a.area_type === 'range'));
</script>

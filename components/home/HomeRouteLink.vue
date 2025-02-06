<template>
  <HomeLink :document="route">
    <span v-if="filteredFields.height_diff_up" :title="$t('fields.height_diff_up.label')" class="comma"
      >+{{ route.height_diff_up }}&nbsp;m</span
    ><span
      v-if="filteredFields.height_diff_difficulties"
      :title="$t('fields.height_diff_difficulties.label')"
      class="comma"
      >{{ route.height_diff_difficulties }}&nbsp;m</span
    ><DocumentRating :fields="filteredFields" />&nbsp;<MarkerQuality :quality="route.quality" />
  </HomeLink>
</template>

<script setup lang="ts">
import type { RouteListing } from '~/api/c2c.js';

const { route } = defineProps<{ route: RouteListing }>();

const filteredFields = computed(
  () =>
    ({
      ...(route.activities.includes('skitouring') && {
        ski_rating: route.ski_rating,
        height_diff_up: route.height_diff_up,
      }),
      ...(route.activities.includes('snow_ice_mixed') && {
        height_diff_difficulties: route.height_diff_difficulties,
        global_rating: route.global_rating,
      }),
      ...(route.activities.includes('mountain_climbing') && {
        height_diff_difficulties: route.height_diff_difficulties,
        engagement_rating: route.engagement_rating,
      }),
      ...(route.activities.includes('rock_climbing') && {
        height_diff_difficulties: route.height_diff_difficulties,
        equipement_rating: route.equipment_rating,
        rock_free_rating: route.rock_free_rating,
        rock_required_rating: route.rock_required_rating,
      }),
      ...(route.activities.includes('ice_climbing') && {
        height_diff_difficulties: route.height_diff_difficulties,
        ice_rating: route.ice_rating,
      }),
      ...(route.activities.includes('via_ferrata') && {
        via_ferrata_rating: route.via_ferrata_rating,
        height_diff_difficulties: route.height_diff_difficulties,
      }),
      ...(route.activities.includes('mountain_biking') && {
        mtb_up_rating: route.mtb_up_rating,
        mtb_down_rating: route.mtb_down_rating,
      }),
      ...(route.activities.includes('snowshoeing') && {
        height_diff_up: route.height_diff_up,
        height_diff_down: route.height_diff_down,
        snowshoe_rating: route.snowshoe_rating,
      }),
      ...(route.activities.includes('hiking') && {
        hiking_rating: route.hiking_rating,
        height_diff_up: route.height_diff_up,
        height_diff_down: route.height_diff_down,
      }),
      ...(route.activities.includes('slacklining') && {
        slackline_height: route.slackline_height,
      }),
    } as Record<string, unknown>),
);
</script>

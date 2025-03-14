<template>
  <!-- TODO styling -->
  <table v-if="hasData">
    <thead>
      <tr>
        <th>
          {{ $t('markdown.outing.condition-level.place') }}
        </th>
        <th>
          {{ $t('markdown.outing.condition-level.soft-snow') }}
        </th>
        <th>
          {{ $t('markdown.outing.condition-level.total-snow') }}
        </th>
        <th>
          {{ $t('markdown.outing.condition-level.comment') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(level, i) of levels" :key="i">
        <td :data-title="level.level_place ? $t('markdown.outing.condition-level.place') : undefined">
          {{ level.level_place }}
        </td>
        <td :data-title="level.level_snow_height_soft ? $t('markdown.outing.condition-level.soft-snow') : undefined">
          {{ level.level_snow_height_soft }}
        </td>
        <td :data-title="level.level_snow_height_total ? $t('markdown.outing.condition-level.total-snow') : undefined">
          {{ level.level_snow_height_total }}
        </td>
        <td :data-title="level.level_comment ? $t('markdown.outing.condition-level.comment') : undefined">
          {{ level.level_comment }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { ConditionLevel } from '~/api/c2c.js';

const { levels } = defineProps<{ levels: ConditionLevel[] | null }>();

const hasData = computed(() => {
  if (!levels?.length) {
    return false;
  }
  return (
    levels[0].level_place ||
    levels[0].level_snow_height_soft ||
    levels[0].level_snow_height_total ||
    levels[0].level_comment
  );
});
</script>

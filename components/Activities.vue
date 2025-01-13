<template>
  <span v-if="activities !== null">
    <span
      v-for="activity of sortedActivities"
      :key="activity"
      :title="$t(`activity-values.${activity}`)"
      class="replace-icon-by-names-on-print">
      <IconActivity :activity="activity" />
    </span>
  </span>
</template>

<script setup lang="ts">
import type { Activity } from '~/api/c2c.js';

const { activities } = defineProps<{ activities: Activity[] }>();

const sortedActivities = computed(() => activities.slice(0).sort());
</script>

<style scoped lang="css">
@media print {
  /* write the activity's title instead of the icon */
  .replace-icon-by-names-on-print {
    color: var(--p-text-color) !important;
  }

  .replace-icon-by-names-on-print:not(:last-child):after {
    content: attr(title) ', ';
  }

  .replace-icon-by-names-on-print:last-child:after {
    content: attr(title);
  }
}
</style>

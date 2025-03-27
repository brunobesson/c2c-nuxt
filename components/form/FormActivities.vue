<template>
  <FormLabel :field :label="'activities'" :errorMessage />
  <div>
    <FormActivity v-for="activity of activities" :key="activity" :field :activity :show-label="showLabel" />
  </div>
</template>

<script setup lang="ts">
import { ACTIVITIES, type DocumentType } from '~/api/c2c.js';

const {
  field,
  documentType,
  showLabel = false,
} = defineProps<{ field: string; documentType: DocumentType; showLabel?: boolean }>();
const errors = useFormErrors();
const errorMessage = computed(() => errors.value[field as keyof typeof errors.value]);
const activities = computed(() => {
  if (documentType !== 'route') {
    return ACTIVITIES;
  }
  return ACTIVITIES.filter(act => act !== 'paragliding');
});
</script>

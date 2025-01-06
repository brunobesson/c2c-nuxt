<template>
  <DropdownMenu v-if="showHelper" :items="menuItems">
    <template #trigger>
      <div class="flex items-center cursor-help">
        <DocumentRatingSummary :fields="fields" />
        <Icon icon="info-circle" class="print:hidden" />
      </div>
    </template>
    <template #item="{ item }">
      <NuxtLink :to="item.to">
        <span class="font-semibold">{{ item.value }}</span> {{ item.descr }}
      </NuxtLink>
    </template>
  </DropdownMenu>
  <DocumentRatingSummary v-else :fields="fields" />
</template>

<script setup lang="ts">
import fieldProperties from '@/api/fieldProperties.js';
import type { MenuItem } from 'primevue/menuitem';

const { t } = useI18n();
const { fields, showHelper = false } = defineProps<{ fields: Record<string, unknown>; showHelper?: boolean }>();

const detailedFields = [
  'global_rating',
  'via_ferrata_rating',
  'rock_free_rating',
  'rock_required_rating',
  'aid_rating',
  'engagement_rating',
  'risk_rating',
  'equipment_rating',
  'exposition_rock_rating',
  'ice_rating',
  'mixed_rating',
  'ski_rating',
  'ski_exposition',
  'labande_global_rating',
  'labande_ski_rating',
  'snowshoe_rating',
  'hiking_rating',
  'mtb_up_rating',
  'mtb_down_rating',
  'hiking_mtb_exposition',
];
const menuItems = computed((): MenuItem[] =>
  showHelper
    ? Object.entries(fields)
        .filter(([k]) => detailedFields.includes(k))
        .map(([k, v]) => {
          const helper = fieldProperties[k as keyof typeof fieldProperties]?.helper?.split('#');
          return {
            value: '' + v,
            descr: capitalize(t(`fields.${k}.label`)),
            to: helper ? `/articles/${helper[0]}/${helper[1]}` : undefined,
          };
        })
        .filter(item => item.to)
    : [],
);
</script>

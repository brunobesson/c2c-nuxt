<template>
  <span class="inline-flex gap-1">
    <span v-if="fields.global_rating" :title="$t('fields.global_rating.label')">{{ fields.global_rating }}</span>

    <span v-if="fields.via_ferrata_rating" :title="$t('fields.via_ferrata_rating.label')">{{
      fields.via_ferrata_rating
    }}</span>

    <span v-if="fields.rock_free_rating || fields.rock_required_rating">
      <span v-if="fields.rock_free_rating" :title="$t('fields.rock_free_rating.label')">
        {{ rockFreeRating
        }}<!----></span
      ><!----><span v-if="fields.rock_required_rating" :title="$t('fields.rock_required_rating.label')"
        ><!---->&gt;{{ fields.rock_required_rating }}
      </span>
    </span>

    <span v-if="fields.aid_rating" :title="$t('fields.aid_rating.label')">
      {{ fields.aid_rating }}
    </span>

    <span v-if="fields.engagement_rating" :title="$t('fields.engagement_rating.label')">
      {{ fields.engagement_rating }}
    </span>

    <span v-if="fields.risk_rating" :title="$t('fields.risk_rating.label')">
      {{ fields.risk_rating }}
    </span>

    <span v-if="fields.equipment_rating" :title="$t('fields.equipment_rating.label')">
      {{ fields.equipment_rating }}
    </span>
    <span v-if="fields.exposition_rock_rating" :title="$t('fields.exposition_rock_rating.label')">
      {{ fields.exposition_rock_rating }}
    </span>
    <span v-if="fields.ice_rating" :title="$t('fields.ice_rating.label')">
      {{ fields.ice_rating }}
    </span>
    <span v-if="fields.mixed_rating" :title="$t('fields.mixed_rating.label')">
      {{ fields.mixed_rating }}
    </span>
    <span v-if="fields.ski_rating" :title="$t('fields.ski_rating.label')">
      {{ fields.ski_rating }}
    </span>
    <span v-if="fields.ski_rating && (fields.ski_exposition || fields.labande_global_rating)"> / </span>
    <span v-if="fields.ski_exposition || fields.labande_global_rating">
      <span v-if="fields.ski_exposition" :title="$t('fields.ski_exposition.label')">
        {{ fields.ski_exposition }}
      </span>
      <span v-if="fields.labande_global_rating" :title="$t('fields.labande_global_rating.label')">
        {{ fields.labande_global_rating }}
      </span>
    </span>

    <span v-if="fields.labande_ski_rating" :title="$t('fields.labande_ski_rating.label')">
      /
      {{ fields.labande_ski_rating }}
    </span>
    <span v-if="fields.snowshoe_rating" :title="$t('fields.snowshoe_rating.label')">
      {{ fields.snowshoe_rating }}
    </span>
    <span v-if="fields.hiking_rating" :title="$t('fields.hiking_rating.label')">
      {{ fields.hiking_rating }}
    </span>
    <span v-if="fields.mtb_up_rating" :title="$t('fields.mtb_up_rating.label')">
      {{ fields.mtb_up_rating }}
    </span>
    <span v-if="fields.mtb_down_rating" :title="$t('fields.mtb_down_rating.label')">
      {{ fields.mtb_down_rating }}
    </span>
    <span v-if="fields.hiking_mtb_exposition" :title="$t('fields.hiking_mtb_exposition.label')">
      {{ fields.hiking_mtb_exposition }}
    </span>
  </span>
</template>

<script setup lang="ts">
const { fields } = defineProps<{ fields: Record<string, unknown> }>();

const rockFreeRating = computed(() => {
  const rating = fields.rock_free_rating as string | undefined;
  if (fields.climbing_outdoor_type !== 'bloc') {
    return rating;
  }
  return rating?.toLocaleUpperCase();
});
</script>

<template>
  <div>
    <FormLabel field="quality" :label :errorMessage />&nbsp;
    <Icon
      v-if="!isCollaborative"
      @click="autoComputeQuality = !autoComputeQuality"
      :icon="autoComputeQuality ? 'lock' : 'unlock'"
      class="cursor-pointer" />
  </div>
  <div class="max-w-80">
    <select v-if="autoComputeQuality && !isCollaborative" disabled :value="formValues.quality">
      <option v-for="option of QUALITY_TYPE_VALUES" :key="option" :value="option">
        {{ $t(`quality-values.${option}`) }}
      </option>
    </select>
    <select v-else v-model="value">
      <option v-for="option of QUALITY_TYPE_VALUES" :key="option" :value="option">
        {{ $t(`quality-values.${option}`) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import {
  type Activity,
  type ArticleAddInitial,
  type ArticleEdit,
  type DocumentAddInitial,
  type DocumentEdit,
  type ImageEdit,
  type OutingAddInitial,
  type OutingEdit,
  type QualityType,
  QUALITY_TYPE_VALUES,
} from '~/api/c2c.js';

const { document } = defineProps<{ document: DocumentEdit | DocumentAddInitial; label?: string }>();

const { value, errorMessage } = useField('quality');

const autoComputeQuality = ref(true);

const isCollaborative = computed(() => {
  if (['a', 'b', 'w', 'r', 'm'].includes(document.type)) {
    return true;
  }
  if (['u', 'o', 'x'].includes(document.type)) {
    return false;
  }
  if (document.type === 'i') {
    return document.image_type === 'collaborative';
  }
  if (document.type === 'c') {
    return document.article_type === 'collab';
  }

  return false;
});

const getQualityFromScore = (score: number) => {
  if (score < 1) {
    return 'empty';
  } else if (score < 2) {
    return 'draft';
  } else if (score < 3) {
    return 'medium';
  } else if (score < 4) {
    return 'fine';
  }
  return 'fine'; // never compute great
};

const getImageQuality = (doc: ImageEdit) => {
  let score = 0;

  score += doc.geometry && doc.geometry.geom ? 1 : 0;
  score += doc.activities && doc.activities.length ? 0.5 : 0;
  score += doc.categories && doc.categories.length ? 0.5 : 0;
  score += doc.associations.waypoints.length || doc.associations.routes.length ? 1 : 0;

  score += doc.locales[0].title ? 1 : 0;
  score += doc.locales[0].description ? 1 : 0;

  return getQualityFromScore(score);
};

const getArticleQuality = (doc: ArticleEdit | ArticleAddInitial) => {
  const description = doc.locales[0].description || '';
  let score = 0;
  score += doc.associations.waypoints.length ? 1 : 0;
  score += doc.associations.images.length ? 1 : 0;
  score += doc.locales[0].summary ? 1 : 0;
  score += description ? 1 : -1;
  score += description.search(/(^|\n)##/g) !== -1 ? 1 : 0; // title
  score += description.search(/\[img=/g) !== -1 ? 1 : 0; // img

  return getQualityFromScore(score);
};

const getOutingQuality = (doc: OutingEdit | OutingAddInitial) => {
  const hasActivities = (activities: Activity[]) => intersects(activities, doc.activities);

  const hasSnowInfo = () =>
    doc.elevation_up_snow ||
    doc.elevation_down_snow ||
    doc.snow_quantity ||
    doc.snow_quality ||
    doc.length_total ||
    doc.glacier_rating;

  const hasConditionLevel = () => {
    if (doc.locales[0].conditions) {
      return true;
    }
    const levels = doc.locales[0].conditions_levels;
    if (!levels?.length) {
      return false;
    }
    if (
      levels[0].level_place ||
      levels[0].level_comment ||
      levels[0].level_snow_height_total ||
      levels[0].level_snow_height_soft
    ) {
      return true;
    }
    return false;
  };

  const hasRouteInfo = () => !!doc.geometry.geom_detail || doc.locales[0].route_description;

  const getSkiScore = () => {
    let score = 0;
    if (hasRouteInfo()) score += 0.5;
    if (hasSnowInfo()) score += 0.5;
    if (
      (doc.access_condition && doc.access_condition !== 'snowy' && doc.elevation_access !== null) ||
      (doc.access_condition === 'snowy' && doc.elevation_access !== null && doc.locales[0].access_comment)
    ) {
      score += 0.5;
    }

    if (doc.avalanche_signs?.filter(v => v !== 'no').length && doc.locales[0].avalanches) score += 0.5;

    if (doc.locales[0].description) score += 0.5;
    if (doc.locales[0].weather) score += 0.5;
    if (doc.condition_rating) score += 0.5;

    score = hasConditionLevel() ? score + 1 : Math.min(score, 2);
    return score;
  };

  const getIceScore = () => {
    let score = 0;
    if (hasRouteInfo()) score += 0.5;
    if (doc.condition_rating) score += 0.5;
    if (doc.locales[0].description) score += 1;
    if (doc.locales[0].timing) score += 0.5;
    if (doc.locales[0].weather) score += 0.5;
    score = hasConditionLevel() ? score + 1.5 : Math.min(score, 2);
    return score;
  };

  const getClimbingScore = () => {
    let score = 0;
    if (hasRouteInfo()) score += 0.5;
    if (doc.locales[0].description) score += 1;
    if (doc.locales[0].timing) score += 0.5;
    if (doc.locales[0].weather) score += 0.5;
    score = doc.locales[0].conditions ? score + 2 : Math.min(score, 2);
    return score;
  };

  let skiScore = 0;
  let iceScore = 0;
  let climbingScore = 0;
  if (hasActivities(['skitouring', 'snowshoeing'])) {
    skiScore = getSkiScore();
  }
  if (hasActivities(['snow_ice_mixed', 'ice_climbing', 'mountain_climbing'])) {
    iceScore = getIceScore();
  }
  if (hasActivities(['rock_climbing', 'hiking', 'mountain_biking', 'via_ferrata', 'paragliding', 'slacklining'])) {
    climbingScore = getClimbingScore();
  }
  const score = Math.max(skiScore, iceScore, climbingScore);
  return getQualityFromScore(score);
};

const formValues = useFormValues();
watch(
  [formValues, autoComputeQuality],
  () => {
    if (!autoComputeQuality.value) {
      return;
    }
    let computedQuality: QualityType = 'empty';
    if (!document) {
      computedQuality = 'empty';
    } else if (document.type === 'o') {
      computedQuality = getOutingQuality(formValues.value as typeof document);
    } else if (document.type === 'c') {
      computedQuality = getArticleQuality(formValues.value as typeof document);
    } else if (document.type === 'i') {
      computedQuality = getImageQuality(formValues.value as typeof document);
    } else {
      computedQuality = (formValues.value as typeof document).quality;
    }

    // "great is never proposed by the computation. When current quality is
    // "great", it's because it has been explicitly set => do not change it
    if ((formValues.value as typeof document).quality === 'great') {
      computedQuality = 'great';
    }

    (formValues.value as typeof document).quality = computedQuality;
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <span
    v-if="!!condition"
    :title="
      capitalize($t('colon', { before: $t('condition_rating'), after: $t(`condition_rating-values.${condition}`) }))
    ">
    <IconCondition :condition="condition" />
  </span>
</template>

<script setup lang="ts">
import type { ConditionRating } from '../../api/c2c.js';

defineProps<{ condition: ConditionRating | null | undefined }>();
</script>

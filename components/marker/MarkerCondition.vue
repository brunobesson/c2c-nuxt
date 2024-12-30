<template>
  <span
    v-if="!!condition"
    :title="capitalize($t('colon', [$t('condition_rating'), $t(`condition_rating-values.${condition}`)]))">
    <IconCondition :condition="condition" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ condition?: string }>();
</script>

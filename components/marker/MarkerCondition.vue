<template>
  <span v-if="!!condition" :title="$t('condition_rating') + $t('colon') + $t(condition, 'condition_ratings')">
    <IconCondition :condition="condition" />
  </span>
</template>

<script setup lang="ts">
defineProps<{ condition?: string }>();
</script>

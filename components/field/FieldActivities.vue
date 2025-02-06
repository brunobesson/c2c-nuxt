<template>
  <LabelValue :label="capitalize($t('activities'))">
    <Activities :activities="document.activities" class="text-2xl text-primary" />
  </LabelValue>
</template>

<script setup lang="ts">
import type { Article, ArticleVersionDocument } from '~/api/c2c.js';

defineProps<{ document: Article | ArticleVersionDocument }>(); // TODO add missing types
</script>

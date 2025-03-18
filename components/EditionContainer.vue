<template>
  <div>
    <h1>
      <IconEdit />
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { ArticleAddInitial, ArticleEdit } from '~/api/c2c.js';
import documentType from '../utils/documentType.js';

const { document, mode } = defineProps<{ document: ArticleEdit | ArticleAddInitial; mode: 'add' | 'edit' }>();

const { t } = useI18n();
useHead({
  title: t(mode === 'edit' ? 'edit.title.add' : `edit.title.add.${documentType(document.type)}`),
});
</script>

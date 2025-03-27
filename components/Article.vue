<template>
  <!-- TODO seo -->
  <DocumentMaskedVersionBanner v-if="isMaskedVersionedDocument(document)" :document />
  <DocumentViewHeader v-else :document :version="version" />
  <div
    v-if="!isMaskedVersionedDocument(document)"
    class="flex flex-col mobile:grid mobile:grid-cols-[25%_auto] print:flex gap-5">
    <div class="flex flex-col gap-5">
      <Box>
        <BoxFieldActivities :document />
        <BoxFieldTextArray
          :value="document.categories"
          i18n="article_categories-values"
          :label="$t('fields.article_categories')" />
        <BoxFieldText :value="document.article_type" i18n="article_type-values" :label="$t('fields.article_type')" />
        <LabelValue
          v-if="document.author && document.article_type === 'personal'"
          :label="capitalize($t('contributor'))">
          <LinkAuthor :author="document.author" />
        </LabelValue>
      </Box>
      <BoxTools :document v-if="!isMobile" />
    </div>
    <div class="flex flex-col gap-5">
      <Box>
        <DocumentLowQualityBanner v-if="isEditable && ['empty', 'draft'].includes(document.quality)" :document />
        <Markdown :content="document.cooked.summary" is-summary />
        <Markdown :content="document.cooked.description" />
        <div class="clear-both" />
      </Box>
      <BoxRoutes v-if="isDefaultView" :document :show-buttons="false" />
      <BoxRecentOutings v-if="isDefaultView" :document />
      <!-- TODO <BoxImages v-if="isDefaultView" :document /> -->
      <BoxTools v-if="isMobile" :document />
      <BoxComments v-if="isDefaultView" :document />
    </div>
    <DocumentPrintLicense :document />
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/api/c2c.js';
import { isMaskedVersionedDocument, type MaskedVersionedDocument, type VersionedArticle } from '~/types/common.js';

const { document } = defineProps<{ document: Article | VersionedArticle | MaskedVersionedDocument }>();

const { locale } = useI18n();
const { isMobile } = useScreen();
const { isDefaultView } = useDocumentViewType(locale);

const { version, isEditable } = useDocumentView(locale, document);
</script>

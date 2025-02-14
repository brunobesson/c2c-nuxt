<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <div v-else-if="document !== null">
      <!-- TODO seo -->
      <DocumentMaskedVersionBanner v-if="isMaskedVersionedDocument(document)" :document="document" />
      <DocumentViewHeader v-else :document="document" :version="version" />
      <div
        v-if="!isMaskedVersionedDocument(document)"
        class="flex flex-col mobile:grid mobile:grid-cols-[25%_auto] print:flex gap-5 py-5">
        <div class="flex flex-col gap-5">
          <Box>
            <FieldActivities :document="document" />
            <FieldTextArray
              :value="document.categories"
              i18n="article_categories-values"
              :label="$t('fields.article_categories')" />
            <FieldText :value="document.article_type" i18n="article_type-values" :label="$t('fields.article_type')" />
            <LabelValue
              v-if="document.author && document.article_type === 'personal'"
              :label="capitalize($t('contributor'))">
              <LinkAuthor :author="document.author" />
            </LabelValue>
          </Box>
          <BoxTools :document="document" v-if="!isMobile" />
        </div>
        <div class="flex flex-col gap-5">
          <Box>
            <DocumentLowQualityBanner
              v-if="isEditable && ['empty', 'draft'].includes(document.quality)"
              :document="document" />
            <!-- TODO des fois un problème d'ordre au refresh? -->
            <Markdown :content="document.cooked.summary" is-summary />
            <Markdown :content="document.cooked.description" />
            <!-- TODO <div style="clear: both" /> -->
          </Box>
          <BoxRoutes v-if="!isDraftView" :document="document" :show-buttons="false" />
          <!-- TODO <recent-outings-box v-if="!isDraftView" :document="document" /> -->
          <!-- TODO <images-box v-if="!isDraftView" :document="document" /> -->
          <!-- TODO <tool-box :document="document" v-if="$screen.isMobile" /> -->
          <!-- TODO <comments-box v-if="!isDraftView" :document="document" /> -->
        </div>
        <DocumentPrintLicense :document="document" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/api/c2c.js';
import { isMaskedVersionedDocument, type VersionedArticle } from '../../types/common.js';

const { draft } = defineProps<{ draft?: Article }>();

const { locale } = useI18n();
const { isMobile } = useScreen();
const { isDraftView } = useDocumentViewType(locale);
const { document, status } = useDocumentLoad<Article, VersionedArticle>(locale, draft);
const { version, isEditable } = useDocumentView(locale, document);
</script>

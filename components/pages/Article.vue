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
import type { Article, Document, DocumentType } from '~/api/c2c.js';
import type { ApiLang } from '../../api/lang.js';
import { isDocument, isMaskedVersionedDocument, type VersionedArticle } from '../../types/common.js';

const { draft } = defineProps<{ draft?: Article }>();

const { locale } = useI18n();
const { isMobile } = useScreen();
const { isDraftView, isVersionView, isPrintingView, documentType, expectedLang } = useDocumentViewType(locale);
const { loadDocument, loadVersionedDocument, cook } = useDocumentLoad<Article, VersionedArticle>();
const { data: document, status } = useAsyncData(async () => {
  if (isVersionView.value) {
    return loadVersionedDocument(
      useRouteParams('id', 0, { transform: Number }),
      documentType.value as Exclude<DocumentType, 'map' | 'profile'>,
      useRouteParams('lang').value as ApiLang,
      useRouteParams('version', 0, { transform: Number }),
    );
  } else if (isDraftView.value || isPrintingView.value) {
    return cook(draft!);
  } else {
    return loadDocument(useRouteParams('id', 0, { transform: Number }).value, documentType.value, expectedLang);
  }
});

onMounted(() => {
  const doc = unref(document);
  if (!doc || isMaskedVersionedDocument(doc)) {
    return;
  }
  if (isDocument(doc) && doc.redirects_to) {
    // TODO check working
    useRouter().push({ params: { id: doc.redirects_to } });
  }

  // TODO updateHead (et pas ici car SSR !!)

  if (isDocument(doc)) {
    scrollToHash();
    updateUrl(doc);
  }
});

const scrollToHash = () => {
  // TODO working ? how to factorize watch?
  const hash = useRoute().hash;
  if (!hash || !import.meta.client) {
    return;
  }

  nextTick(() => {
    globalThis.document.querySelector(hash)?.scrollIntoView();
  });
};

const getCurrentPath = (doc: Document) => {
  let title = useDocument(doc).documentTitle(locale.value);

  // transform any unicode into its ascii value
  title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // and clean
  title = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  let path = `/${documentType.value}s/${doc.document_id}/${locale.value}/${title}`;

  if (useRoute().hash) {
    path += useRoute().hash;
  }

  return path;
};

const updateUrl = (doc: Document) => {
  const currentPath = getCurrentPath(doc);
  if (useRoute().path !== currentPath) {
    window.history.replaceState({}, '', currentPath);
  }
};

const { version, isEditable } = useDocumentView(locale, document);
</script>

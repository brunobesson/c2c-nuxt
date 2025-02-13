<template>
  <div>
    <!-- TODO <html-header v-if="!isDraftView && !isPrintingView" :title="title" /> -->
    <DocumentVersionBanner
      v-if="isVersionedDocument(document) || isMaskedVersionedDocument(document)"
      :document="document" />
    <div v-if="!isMaskedVersionedDocument(document)">
      <Box>
        <h1 class="text-3xl">
          <IconDocument :type="documentType" />
          <DocumentTitle :document="document" />
          <span v-if="isOuting(document)">
            {{ outingDates(document.date_start, document.date_end) }}
          </span>
          <span v-if="isXreport(document)">{{ longOutingDate(document.date) }}</span>

          <span v-if="!isDraftView" class="float-right print:hidden">
            <!-- TODO <gotop-button v-if="isPrintingView" />-->
            <ButtonFollow v-if="!isPrintingView" :document="document" />
            <ButtonTag v-if="!isPrintingView" :document="document" />
            <!-- TODO social network sharing -->
            <!-- TODO image uploader -->
            <LinkEdit
              v-if="isEditable && documentType !== 'image'"
              :document="document"
              :lang="document.cooked.lang"
              :title="$t('link.edit')">
              <IconEdit />
            </LinkEdit>
          </span>
        </h1>
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document } from '~/api/c2c.js';
import type { MaskedVersionedDocument, VersionedDocument } from '~/types/common.js';
import { isMaskedVersionedDocument, isOuting, isVersionedDocument, isXreport } from '~/types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument | MaskedVersionedDocument }>();

const { locale } = useI18n();
const { outingDates, longOutingDate } = useDate(locale);
const { documentType, isDraftView, isPrintingView } = useDocumentViewType(locale);
const { isEditable } = useDocumentView(locale, document);
</script>
²

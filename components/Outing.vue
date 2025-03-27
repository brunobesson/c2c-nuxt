<template>
  <!-- TODO seo -->
  <DocumentMaskedVersionBanner v-if="isMaskedVersionedDocument(document)" :document />
  <DocumentViewHeader v-else :document :version="version" />
  <template v-if="!isMaskedVersionedDocument(document)">
    <BoxImages :document />
    <div class="flex flex-col mobile:grid mobile:grid-cols-[25%_auto] print:flex gap-5">
      <div class="flex flex-col gap-5">
        <BoxMap :document />
        <BoxTools :document v-if="!isMobile" />
      </div>
      <div class="flex flex-col gap-5">
        <Box>
          <div class="print:hiden" v-for="route of document.associations.routes" :key="route.document_id">
            <LinkRoutePretty :route="route" :show-areas="false" :show-orientations="false" />
          </div>
          <div>
            <LinkProfiles :profiles="document.associations.users" /><template v-if="document.cooked.participants"
              >, {{ document.cooked.participants }}</template
            >
          </div>
        </Box>

        <Box>
          <MarkdownSection :document field="route_description" />
          <MarkdownSection :document field="weather" />
          <MarkdownSection :document field="conditions" />

          <ConditionLevels :levels="document.cooked.conditions_levels" />

          <MarkdownSection :document field="avalanches" />
          <MarkdownSection :document field="timing" />
          <MarkdownSection :document field="access_comment" />
          <MarkdownSection :document field="hut_comment" />
          <MarkdownSection :document field="description" :title="$t('markdown.outing.personal_comment')" />
          <div class="clear-both" />
        </Box>

        <BoxTools v-if="isMobile" :document />
        <BoxComments v-if="isDefaultView" :document />
      </div>
      <DocumentPrintLicense :document />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Outing } from '~/api/c2c.js';
import { isMaskedVersionedDocument, type MaskedVersionedDocument, type VersionedOuting } from '~/types/common.js';

const { document } = defineProps<{ document: Outing | VersionedOuting | MaskedVersionedDocument }>();

const { locale } = useI18n();
const { isMobile } = useScreen();
const { isDefaultView } = useDocumentViewType(locale);

const { version } = useDocumentView(locale, document);
</script>

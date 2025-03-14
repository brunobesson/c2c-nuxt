<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <component v-else-if="document !== null" :is="component!.component" v-bind="{document: component!.document}" />
  </div>
</template>

<script setup lang="ts">
import {
  Area as AreaComponent,
  Article as ArticleComponent,
  Book as BookComponent,
  Image as ImageComponent,
  Outing as OutingComponent,
  Route as RouteComponent,
  Waypoint as WaypointComponent,
  Xreport as XreportComponent,
} from '#components';

import type { DocumentType } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';
import type {
  MaskedVersionedDocument,
  VersionedArea,
  VersionedArticle,
  VersionedBook,
  VersionedImage,
  VersionedOuting,
  VersionedRoute,
  VersionedWaypoint,
  VersionedXreport,
} from '~/types/common.js';

const { locale } = useI18n();
const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams('lang');
const version = useRouteParams('version', 0, { transform: Number });
const { documentType } = useDocumentViewType(locale);
const component = computed(() => {
  switch (documentType.value) {
    case 'area':
      return {
        component: AreaComponent,
        document: document.value as Readonly<VersionedArea | MaskedVersionedDocument>,
      };
    case 'article':
      return {
        component: ArticleComponent,
        document: document.value as Readonly<VersionedArticle | MaskedVersionedDocument>,
      };
    case 'book':
      return {
        component: BookComponent,
        document: document.value as Readonly<VersionedBook | MaskedVersionedDocument>,
      };
    case 'image':
      return {
        component: ImageComponent,
        document: document.value as Readonly<VersionedImage | MaskedVersionedDocument>,
      };
    case 'outing':
      return {
        component: OutingComponent,
        document: document.value as Readonly<VersionedOuting | MaskedVersionedDocument>,
      };
    case 'route':
      return {
        component: RouteComponent,
        document: document.value as Readonly<VersionedRoute | MaskedVersionedDocument>,
      };
    case 'waypoint':
      return {
        component: WaypointComponent,
        document: document.value as Readonly<VersionedWaypoint | MaskedVersionedDocument>,
      };
    case 'xreport':
      return {
        component: XreportComponent,
        document: document.value as Readonly<VersionedXreport | MaskedVersionedDocument>,
      };
  }
});
const { loadVersionedDocument } = useDocumentLoad();
const { data: document, status } = useAsyncData(
  async () => {
    // TODO updateHead
    return loadVersionedDocument(
      documentId.value,
      documentType.value as Exclude<DocumentType, 'map' | 'profile'>,
      lang.value as ApiLang,
      version.value,
    );
  },
  {
    watch: [documentId, lang, version],
  },
);
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <component
      v-else-if="document !== null"
      :is="component!.component"
      v-bind="{document: component!.document, mode}" />
  </div>
</template>

<script setup lang="ts">
import {
  AreaEdition,
  ArticleEdition,
  BookEdition,
  ImageEdition,
  MapEdition,
  OutingEdition,
  ProfileEdition,
  RouteEdition,
  WaypointEdition,
  XreportEdition,
} from '#components';
import {
  Area,
  Article,
  Book,
  Image,
  Map,
  Outing,
  Profile,
  Route,
  Waypoint,
  Xreport,
  type DocumentType,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

definePageMeta({
  middleware: 'auth-guard',
});

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams<ApiLang>('lang', 'fr');
const route = useRoute();
const documentType = computed(() => (route.name as string).replace(/-(edit|add)/, '') as DocumentType);
const mode = (route.name as string).split('-')[1] as 'edit' | 'add';
const component = computed(() => {
  switch (documentType.value) {
    case 'area':
      return { component: AreaEdition, document: document.value as Area | null };
    case 'article':
      return { component: ArticleEdition, document: document.value as Article | null };
    case 'book':
      return { component: BookEdition, document: document.value as Book | null };
    case 'image':
      return { component: ImageEdition, document: document.value as Image | null };
    case 'map':
      return { component: MapEdition, document: document.value as Map | null };
    case 'outing':
      return { component: OutingEdition, document: document.value as Outing | null };
    case 'profile':
      return { component: ProfileEdition, document: document.value as Profile | null };
    case 'route':
      return { component: RouteEdition, document: document.value as Route | null };
    case 'waypoint':
      return { component: WaypointEdition, document: document.value as Waypoint | null };
    case 'xreport':
      return { component: XreportEdition, document: document.value as Xreport | null };
  }
});
const { data: document, status } = useAsyncData(async () => {
  if (mode !== 'edit') {
    return null; // falsy value is allowed, there is no cost doing it a second time on client side
  }
  return useDocumentLoad().loadDocument(documentId, documentType, lang);
});
</script>

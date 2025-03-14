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
  Map as MapComponent,
  Outing as OutingComponent,
  Profile as ProfileComponent,
  Route as RouteComponent,
  Waypoint as WaypointComponent,
  Xreport as XreportComponent,
} from '#components';

import type {
  Area,
  Article,
  Book,
  Document,
  Image,
  Map,
  Outing,
  Profile,
  Route,
  Waypoint,
  Xreport,
} from '~/api/c2c.js';

const { locale } = useI18n();
const documentId = useRouteParams('id', 0, { transform: Number });
const { documentType, expectedLang } = useDocumentViewType(locale);
const component = computed(() => {
  switch (documentType.value) {
    case 'area':
      return { component: AreaComponent, document: document.value as Readonly<Area> };
    case 'article':
      return { component: ArticleComponent, document: document.value as Readonly<Article> };
    case 'book':
      return { component: BookComponent, document: document.value as Readonly<Book> };
    case 'image':
      return { component: ImageComponent, document: document.value as Readonly<Image> };
    case 'map':
      return { component: MapComponent, document: document.value as Readonly<Map> };
    case 'outing':
      return { component: OutingComponent, document: document.value as Readonly<Outing> };
    case 'profile':
      return { component: ProfileComponent, document: document.value as Readonly<Profile> };
    case 'route':
      return { component: RouteComponent, document: document.value as Readonly<Route> };
    case 'waypoint':
      return { component: WaypointComponent, document: document.value as Readonly<Waypoint> };
    case 'xreport':
      return { component: XreportComponent, document: document.value as Readonly<Xreport> };
  }
});
const { loadDocument } = useDocumentLoad();
const { data: document, status } = useAsyncData(
  async () => {
    // TODO updateHead
    return loadDocument(documentId.value, documentType.value, expectedLang);
  },
  {
    watch: [documentId, expectedLang],
  },
);

watch([document, status], () => postProcessDocument(), { flush: 'post' });

onMounted(() => {
  postProcessDocument();
});

const postProcessDocument = () => {
  if (!document.value || status.value !== 'success') {
    return;
  }
  if (document.value.redirects_to) {
    // TODO check working
    useRouter().push({ params: { id: document.value.redirects_to } });
    return;
  }
  // TODO check working
  scrollToHash();
  updateUrl(document.value);
};

const scrollToHash = () => {
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

  let path = `/${documentType.value}s/${doc.document_id}/${doc.locales[0].lang}/${title}`;

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
</script>

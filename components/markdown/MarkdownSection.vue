<template>
  <Expandable v-if="content">
    <template #header>
      <h2 class="text-3xl font-semibold w-full border-b border-gray-200">{{ title ?? capitalize($t(field)) }}</h2>
    </template>
    <Markdown :content="content" :is-summary />
  </Expandable>
</template>

<script setup lang="ts">
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
import type {
  VersionedArea,
  VersionedArticle,
  VersionedBook,
  VersionedDocument,
  VersionedImage,
  VersionedOuting,
  VersionedRoute,
  VersionedWaypoint,
  VersionedXreport,
} from '~/types/common.js';

type CookedField<D extends Document | VersionedDocument> = Exclude<
  keyof D['cooked'],
  'title' | 'lang' | 'version' | 'topic_id'
>;
type MaybeVersionedDocAndField<D extends Document | VersionedDocument> = {
  document: D;
  field: CookedField<D>;
};
type DocAndField<D extends Document, V extends VersionedDocument> =
  | MaybeVersionedDocAndField<D>
  | MaybeVersionedDocAndField<V>;
const {
  document,
  field,
  title = null,
  isSummary = false,
} = defineProps<
  (
    | DocAndField<Area, VersionedArea>
    | DocAndField<Article, VersionedArticle>
    | DocAndField<Book, VersionedBook>
    | DocAndField<Image, VersionedImage>
    | MaybeVersionedDocAndField<Map>
    | DocAndField<Outing, VersionedOuting>
    | MaybeVersionedDocAndField<Profile>
    | DocAndField<Route, VersionedRoute>
    | DocAndField<Waypoint, VersionedWaypoint>
    | DocAndField<Xreport, VersionedXreport>
  ) & { title?: string; isSummary?: boolean }
>();

const content = computed(() => {
  return document.cooked[field as CookedField<typeof document>];
});
</script>

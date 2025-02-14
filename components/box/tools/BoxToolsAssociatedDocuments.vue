<template>
  <!-- TODO styling -->
  <!-- waypoints -->
  <div v-if="waypointsLists.length" v-for="(waypointsList, i) of waypointsLists" :key="i">
    <div class="text-xl">{{ waypointsList.title }}</div>
    <LinkDocument v-for="waypoint of waypointsList.waypoints" :key="waypoint.document_id" :document="waypoint">
      <IconWaypointType :type="waypoint.waypoint_type" fixed-width />&nbsp;<DocumentTitle :document="waypoint" />
      {{ waypoint.elevation }}&nbsp;m
    </LinkDocument>
  </div>
  <!-- books -->
  <div v-if="associations.books?.length">
    <div class="text-xl">{{ capitalize($t('books')) }}</div>
    <div
      v-for="book of associations.books"
      :key="book.document_id"
      class="text-ellipsis overflow-hidden whitespace-nowrap">
      <LinkDocument :document="book">
        <IconDocument type="book" fixed-width />&nbsp;<DocumentTitle :document="book" />
      </LinkDocument>
    </div>
  </div>
  <!-- articles -->
  <div v-if="associations.articles?.length">
    <div class="text-xl">{{ capitalize($t('articles')) }}</div>
    <div
      v-for="article of associations.articles"
      :key="article.document_id"
      class="text-ellipsis overflow-hidden whitespace-nowrap">
      <LinkDocument :document="article">
        <IconDocument type="article" fixed-width />&nbsp;<DocumentTitle :document="article" class="link" />
      </LinkDocument>
    </div>
  </div>
  <!-- xreports -->
  <div v-if="associations.xreports?.length">
    <div class="text-xl">{{ capitalize($t('book')) }}</div>
    <div
      v-for="xreport of associations.xreports"
      :key="xreport.document_id"
      class="text-ellipsis overflow-hidden whitespace-nowrap">
      <LinkDocument :document="xreport">
        <IconDocument type="xreport" fixed-width />&nbsp;<DocumentTitle :document="xreport" />
      </LinkDocument>
    </div>
  </div>
  <!-- outings -->
  <div v-if="document.type !== 'x' && associations.outings?.length">
    <div class="text-xl">{{ capitalize($t('outings')) }}</div>
    <div
      v-for="outing of associations.outings"
      :key="outing.document_id"
      class="text-ellipsis overflow-hidden whitespace-nowrap">
      <LinkDocument :document="outing">
        <IconDocument type="outing" fixed-width />&nbsp;<DocumentTitle :document="outing" />
      </LinkDocument>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Document, WaypointListing } from '../../../api/c2c.js';
import { isMap, isVersionedDocument, type Associations, type VersionedDocument } from '../../../types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument }>();

const { t } = useI18n();

const associations: ComputedRef<Associations> = computed(() =>
  isVersionedDocument(document) || isMap(document) ? {} : document.associations,
);
const waypointsLists = computed(() => {
  const result: { title: string; waypoints: WaypointListing[] }[] = [];
  if (Object.hasOwn(associations.value, 'waypoints') && associations.value.waypoints?.length) {
    result.push({ title: capitalize(t('waypoints')), waypoints: associations.value.waypoints! });
  }
  if (Object.hasOwn(associations.value, 'waypoint_children') && associations.value.waypoint_children?.length) {
    result.push({ title: t('box.tools.waypoints_children'), waypoints: associations.value.waypoint_children! });
  }
  return result;
});
</script>

<template>
  <Box v-if="showAddOutingButton || outings.length" class="print:hidden">
    <template #title>
      {{ $t('box.recent-outings.title') }}
    </template>
    <div v-for="outing of outings" :key="outing.document_id">
      <LinkOutingPretty :outing="outing" />
    </div>
    <div v-if="(showSeeAllButton && outings.length) || showAddOutingButton" class="has-text-centered add-section">
      <!-- TODO buttons styling -->
      <NuxtLink v-if="showSeeAllButton && outings.length" :to="{ name: 'outings', query: allOutingsQuery }">
        <Button :label="$t('box.routes.filter')" :badge="'' + totalOutings" />
      </NuxtLink>
      <LinkAdd v-if="showAddOutingButton" document-type="outing" :query="addOutingQuery">
        <Button :label="outings.length ? $t('link.add.outing') : $t('link.add.first-outing')" />
      </LinkAdd>
    </div>
  </Box>
</template>

<script setup lang="ts">
import type { Article, Route, Waypoint } from '../../api/c2c.js';
import type { Query } from '../../composables/useC2cApi.js';
import { isRoute, isWaypoint } from '../../types/common.js';

const {
  document,
  includeEmptyOutings = false,
  showSeeAllButton = true,
} = defineProps<{
  document: Route | Waypoint | Article;
  includeEmptyOutings?: boolean;
  showSeeAllButton?: boolean;
}>();

const outings = computed(() =>
  (isRoute(document) || isWaypoint(document)
    ? document.associations.recent_outings.documents
    : document.associations.outings
  ).filter(({ quality }) => includeEmptyOutings || quality !== 'empty'),
);

const showAddOutingButton = computed(
  // if the document is a route, we can add an outing directly linked to the route
  // if the document is a waypoint, and if it has associated route, then the outing form
  // will propose routes in the extent of the waypoint
  () => isRoute(document) || (isWaypoint(document) && document.associations.all_routes.total != 0),
);

const addOutingQuery: Ref<Query> = computed(() => {
  if (isWaypoint(document)) {
    return { initial_bbox: useDocumentGeometry().bbox(document.associations.recent_outings.documents) };
  } else if (isRoute(document)) {
    return { [document.type]: document.document_id };
  }
  return {};
});

const allOutingsQuery = computed(() => ({ [document.type]: document.document_id }));

const totalOutings = computed(() =>
  isWaypoint(document) || isRoute(document) ? document.associations.recent_outings?.total : outings.value.length,
);
</script>

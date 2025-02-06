<template>
  <Box class="print:hidden">
    <template #title>
      <!-- TODO translate-->
      {{ $t('associated routes') }}
    </template>
    <div v-if="!splitActivities" v-for="route of routes">
      <LinkRoutePretty :route="route" :show-areas="false" />
    </div>
    <template v-else>
      <div v-for="[activity, routes] of routesByAct.entries()">
        <Expendable>
          <template #header>
            <IconActivity :activity="activity" /> {{ capitalize($t(`activity-values.${activity}`)) }}
          </template>
          <LinkRoutePretty v-for="route of routes" :route="route" :show-areas="false" :show-activities="false" />
        </Expendable>
      </div>
    </template>
    <div v-if="showButtons" class="flex gap-5 justify-center">
      <!-- TODO button styling -->
      <NuxtLink v-if="routes.length" :to="{ name: 'routes', query }">
        <Button :label="$t('filter results')" :badge="'' + routesCount" />
      </NuxtLink>
      <LinkAdd document-type="route" :query="query">
        <Button severity="secondary" :label="$t('link.add.route')" />
      </LinkAdd>
    </div>
  </Box>
</template>

<script setup lang="ts">
import type { Activity, Outing, Route, RouteListing, Waypoint } from '~/api/c2c.js';
import { isWaypoint } from '~/types/common.js';

const {
  document,
  showButtons = true,
  splitActivities = true,
} = defineProps<{
  document: Outing | Route | Waypoint;
  showButtons?: boolean;
  splitActivities?: boolean;
}>();

const { locale } = useI18n();
const { documentTitle } = useDocument(document);

const routes = computed(() => {
  const routes = (isWaypoint(document) ? document.associations.all_routes.documents : document.associations.routes)
    .map(route => ({ ...route, title: documentTitle(locale.value) }))
    .sort((r1, r2) => r1.title.localeCompare(r2.title));
  if (document.type === 'w' && document.waypoint_type !== 'climbing_outdoor') {
    // filter out crags for non climbing sites waypoints
    return routes.filter(route => route.climbing_outdoor_type !== 'single');
  }
  return routes;
});

const routesByAct = computed(() => {
  return routes.value.reduce((m, route) => {
    route.activities.forEach(act => {
      if (!m.has(act)) {
        m.set(act, []);
      }
      m.get(act)!.push(route);
    });
    return m;
  }, new Map<Activity, RouteListing[]>());
});

const routesCount = computed(() =>
  isWaypoint(document) ? document.associations.all_routes.total : document.associations.routes.length,
);

const query = computed(() => ({ [document.type]: document.document_id }));
</script>

<template>
  <div
    class="bg-laurentf-sajama-800 mobile:bg-laurentf-sajama-1024 tablet:bg-laurentf-sajama-1200 bg-cover bg-center pt-28">
    <h1 class="text-5xl text-white text-center font-semibold mb-7">{{ capitalize($t('guidebook')) }}</h1>
    <div class="flex flex-wrap justify-center max-w-[700px] m-auto mb-2">
      <TopoguideLink v-for="{ to, label, icon } in mainLinks" :key="to" :to="to" :label="label" :icon />
    </div>
  </div>
  <div class="grid grid-cols-1 mobile:grid-cols-2">
    <div>
      <h2 class="text-3xl text-center bg-primary text-white rounded leading-10 m-2">
        {{ capitalize($t('outings')) }}
      </h2>
      <div class="grid grid-cols-3 mobile:grid-cols-4 gap-3 p-3">
        <Box v-for="activity of ACTIVITIES" :key="activity" class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: '/outings', query: { act: activity } }"
            class="flex flex-col items-center font-semibold">
            <IconActivity :activity="activity" class="text-4xl" />
            <span class="text-center">{{ capitalize($t(`activity-values.${activity}`)) }}</span>
          </NuxtLink>
        </Box>
        <Box class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: `/outings/add/${lang}` }"
            class="flex flex-col items-center font-semibold text-green-600">
            <Icon icon="plus" fixed-width class="text-4xl" />
            <span class="text-center">{{ $t('topoguide.outing.new') }}</span>
          </NuxtLink>
        </Box>
      </div>
    </div>
    <div>
      <h2 class="text-3xl text-center bg-primary text-white rounded leading-10 m-2">
        {{ capitalize($t('routes')) }}
      </h2>
      <div class="grid grid-cols-3 mobile:grid-cols-4 gap-3 p-3">
        <Box v-for="activity of ACTIVITIES" :key="activity" class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: '/routes', query: { act: activity } }"
            class="flex flex-col items-center font-semibold">
            <IconActivity :activity="activity" class="text-4xl" />
            <span class="text-center">{{ capitalize($t(`activity-values.${activity}`)) }}</span>
          </NuxtLink>
        </Box>
        <Box class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: `/routes/add/${lang}` }"
            class="flex flex-col items-center font-semibold text-green-600">
            <Icon icon="plus" fixed-width class="text-4xl" />
            <span class="text-center">{{ $t('topoguide.route.new') }}</span>
          </NuxtLink>
        </Box>
      </div>
    </div>
    <div class="mobile:col-span-2">
      <h2 class="text-3xl text-center bg-primary text-white rounded leading-10 m-2">
        {{ capitalize($t('waypoints')) }}
      </h2>
      <div class="grid grid-cols-3 mobile:grid-cols-6 gap-3 p-3">
        <Box v-for="type of WAYPOINT_TYPES" :key="type" class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: '/waypoints', query: { wtyp: type } }"
            class="flex flex-col items-center font-semibold">
            <IconWaypointType :type="type" class="text-4xl" />
            <span class="text-center">{{ capitalize($t(`waypoint_type-values.${type}`)) }}</span>
          </NuxtLink>
        </Box>
        <Box class="hover:duration-200 hover:bg-hover">
          <NuxtLink
            :to="{ path: `/routes/add/${lang}` }"
            class="flex flex-col items-center font-semibold text-green-600">
            <Icon icon="plus" fixed-width class="text-4xl" />
            <span class="text-center">{{ $t('topoguide.waypoint.new') }}</span>
          </NuxtLink>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ACTIVITIES, WAYPOINT_TYPES } from '../api/c2c.js';

const { t } = useI18n();
useSeoMeta({
  title: capitalize(t('guidebook')),
});

const { locale: lang } = useI18n();

const mainLinks: { to: string; label: string; icon: string | string[] }[] = [
  { to: '/outings', label: t('outings'), icon: 'outing' },
  { to: '/routes', label: t('routes'), icon: 'route' },
  { to: '/waypoints', label: t('waypoints'), icon: 'waypoint' },
  { to: '/images', label: t('images'), icon: 'image' },
  { to: '/books', label: t('books'), icon: 'book' },
  { to: '/articles', label: t('articles'), icon: 'article' },
  { to: '/areas', label: t('areas'), icon: 'area' },
  { to: '/yeti', label: 'YETI', icon: ['miscs', 'yeti'] },
  { to: '/sophie-picture-contest', label: 'CPS', icon: 'star' },
];
</script>

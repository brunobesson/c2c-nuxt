<template>
  <Box class="print:hidden">
    <div class="flex flex-col [&_hr]:my-3 [&_hr:first-child]:hidden [&_hr_+_hr]:hidden">
      <!-- TODO check this is working in all case (e.g. fundraiser, etc) -->
      <BoxToolsAssociatedDocuments :document="document" />

      <hr />

      <div v-if="isDefaultView && availableLangs?.length" class="text-center">
        {{ $t('box.tools.other-langs') }}
        <div class="flex flex-wrap justify-center">
          <template v-for="(l, i) of availableLangs" :k="l">
            <span v-if="i" class="mx-1">•</span
            ><LinkDocument :document="document" :lang="l!" class="link">{{ $t(`langs.${l}`) }}</LinkDocument>
          </template>
        </div>
      </div>

      <div v-if="weatherLink">
        <NuxtLink :to="weatherLink" external class="link">
          <Icon icon="sun" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.weather-forecast') }}
        </NuxtLink>
      </div>
      <div v-if="directionsLink">
        <NuxtLink :to="directionsLink" external class="link">
          <Icon icon="directions" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.directions') }}
        </NuxtLink>
      </div>
      <div v-if="closestDocumentsLink">
        <NuxtLink :to="closestDocumentsLink" class="link">
          <Icon icon="compass" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.nearby') }}
        </NuxtLink>
      </div>
      <div v-if="paraglidingOutingsLink">
        <NuxtLink :to="paraglidingOutingsLink" class="link">
          <IconActivity activity="paragliding" fixed-width class="text-[--p-text-color]" />
          {{ $t('box.tools.paragliding-outings') }}
        </NuxtLink>
      </div>
      <div v-if="fundraiser">
        <NuxtLink :to="fundraiser" external class="link">
          <Icon :icon="['misc', 'drill']" fixed-width class="text-red-500" /> {{ $t('box.tools.fundraiser') }}
        </NuxtLink>
      </div>
      <div v-if="document.type === 'u'">
        <NuxtLink :to="{ name: 'outings-stats', query: { u: document.document_id } }" class="link">
          <Icon icon="chart-bar" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.statistics') }}
        </NuxtLink>
      </div>

      <hr />

      <div v-if="document.type === 'u'">
        <NuxtLink :to="{ name: 'whatsnew', query: { u: document.document_id } }" class="link">
          <Icon icon="edit" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.contributions') }}
        </NuxtLink>
      </div>
      <div v-if="document.quality">
        <IconQuality :quality="document.quality" fixed-width class="text-[--p-text-color]" />&nbsp;<i18n-t
          keypath="colon"
          scope="global">
          <template #before>{{ capitalize($t('quality')) }}</template>
          <template #after>{{ $t(`quality-values.${document.quality}`) }}</template>
        </i18n-t>
      </div>
      <div v-if="isEditable">
        <NuxtLink
          :to="{ name: `${documentType}-edit`, params: { id: document.document_id, lang: locale } }"
          class="link">
          <Icon icon="edit" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.edit') }}
        </NuxtLink>
      </div>
      <div v-if="isEditable && document.type !== 'a'">
        <a href="#" @click="showAssociationEditor($event)" class="link">
          <Icon icon="link" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.edit-associations') }}
        </a>
      </div>
      <div v-if="document.type !== 'u' || isModerator || document.document_id === user?.id">
        <NuxtLink
          :to="{ name: documentType + '-history', params: { id: document.document_id, lang: document.cooked.lang } }"
          rel="nofollow"
          class="link">
          <Icon icon="history" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.history') }}
        </NuxtLink>
      </div>
      <div v-if="isEditable && missingLangs.length > 0">
        <a href="#" @click="showTranslateModal($event)" class="link">
          <Icon icon="globe" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.translate') }}
        </a>
      </div>
      <div>
        <NuxtLink :href="`mailto:${reportingEmail}?subject=${reportingSubject}&body=${reportingBody}`" class="link">
          <Icon icon="exclamation-circle" fixed-width class="text-red-500" /> {{ $t('box.tools.report-issue') }}
        </NuxtLink>
      </div>

      <hr />

      <!-- Moderator zone -->
      <template v-if="isEditable && isModerator">
        <div>
          <a v-if="document.type !== 'u'" href="#" @click="toggleDocumentLock()" class="link">
            <Icon :icon="document.protected ? 'lock' : 'unlock'" fixed-width class="text-[--p-text-color]" />
            {{ document.protected ? $t('box.tools.unlock-doc') : $t('box.tools.lock-doc') }}
          </a>
        </div>
        <div>
          <a href="#" @click="showMergeModal($event)" class="link">
            <Icon icon="object-group" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.merge') }}
          </a>
        </div>
        <div>
          <a
            v-if="document.type === 'u'"
            href="#"
            @click="accountLockedStatus === 'success' && toggleAccountLock()"
            class="link"
            :class="{ 'pointer-events-none cursor-default': accountLockedStatus !== 'success' }">
            <Icon icon="user-lock" fixed-width class="text-[--p-text-color]" />
            {{ isAccountLocked ? $t('box.tools.unlock-user') : $t('box.tools.lock-user') }}
          </a>
        </div>
      </template>
      <template v-if="isDeletable && isDocument(document)">
        <div>
          <a v-if="document.available_langs.length > 1" href="#" @click="showDeleteLocaleModal($event)" class="link">
            <Icon icon="trash" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.delete-locale') }}
          </a>
        </div>
        <div>
          <a v-if="document.available_langs.length > 1" href="#" @click="showDeleteModal($event)" class="link">
            <Icon icon="trash" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.delete') }}
          </a>
        </div>
      </template>

      <hr />

      <BoxToolsLicense :document="document" />
    </div>
  </Box>
  <DocumentAssociationModal ref="associationModal" />
  <DocumentTranslateModal ref="translateModal" />
  <DocumentMergeModal ref="mergeModal" />
  <DocumentDeleteLocaleModal ref="deleteLocaleModal" />
  <DocumentDeleteLocaleModal ref="deleteModal" />
</template>

<script setup lang="ts">
import { format } from 'ol/coordinate.js';
import { buffer } from 'ol/extent.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import type { Point } from 'ol/geom.js';
import { toLonLat } from 'ol/proj.js';
import type { Document } from '~/api/c2c.js';
import { API_LANGS, ApiLang } from '~/api/lang.js';
import { useAuthStore } from '~/store/auth.js';
import {
  isArea,
  isArticle,
  isDocument,
  isRoute,
  isVersionedArea,
  isVersionedArticle,
  isVersionedDocument,
  isVersionedRoute,
  isVersionedWaypoint,
  isWaypoint,
  type VersionedDocument,
} from '~/types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument }>();

const { locale, t } = useI18n();
const { isDefaultView, documentType } = useDocumentViewType(locale);
const { isEditable, isDeletable } = useDocumentView(locale, document);
const { isModerator, user } = useAuthStore();
const toast = useToast();

const currentLang = useRouteParams('lang', document.cooked.lang) as Ref<ApiLang>;
const availableLangs = computed(() => {
  if (isVersionedDocument(document)) {
    return undefined;
  }
  return document.available_langs.filter(lang => lang !== currentLang.value);
});

const weatherLink = computed(() => {
  if (!isRoute(document) && !isVersionedRoute(document) && !isWaypoint(document) && !isVersionedWaypoint(document)) {
    return undefined;
  }
  const geom = document.geometry.geom;
  if (!geom) {
    return undefined;
  }
  let lang;
  switch (locale.value) {
    case 'fr':
      lang = 'fr/meteo/semaine';
      break;
    case 'it':
      lang = 'it/tempo/settimana';
      break;
    case 'de':
      lang = 'de/wetter/woche';
      break;
    case 'es':
    case 'eu':
    case 'ca':
      lang = 'es/tiempo/semana';
      break;
    case 'en':
    default:
      lang = 'en/weather/week';
  }
  const lonLat = toLonLat((new GeoJSON().readFeatures(geom)[0]!.getGeometry() as Point).getCoordinates()!);
  const coords = format(lonLat, '{y}N{x}E', 4);
  // use waypoint elevation, or elevation of difficuties or max elevation for routes, otherwise nothing
  let elevation = '';
  switch (document.type) {
    case 'w':
      elevation = document.elevation.toString();
      break;
    case 'r':
      elevation = document.difficulties_height?.toString() ?? document.elevation_max?.toString() ?? '';
      break;
  }
  return `https://meteoblue.com/${lang}/${coords}${elevation}`;
});

const directionsLink = computed(() => {
  if (
    document.type !== 'w' ||
    !['access', 'gite', 'camp_site'].includes(document.waypoint_type) ||
    !document.geometry.geom
  ) {
    return undefined;
  }
  const lonLat = toLonLat(
    (new GeoJSON().readFeatures(document.geometry.geom)[0]!.getGeometry() as Point).getCoordinates(),
  );
  const coords = format(lonLat, '{y},{x}', 4);
  return `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
});

const closestDocumentsLink = computed(() => {
  if (isArea(document) || isVersionedArea(document) || isArticle(document) || isVersionedArticle(document)) {
    return undefined;
  }
  const geom = document.geometry.geom;
  if (!geom) {
    return undefined;
  }

  const point = new GeoJSON().readFeatures(document.geometry.geom)[0]!.getGeometry() as Point;
  const extent = buffer(point.getExtent(), 10000);
  return {
    name: documentType.value + 's',
    query: {
      wtyp: document.type === 'w' ? document.waypoint_type : undefined,
      bbox: extent.map(Math.floor).join(','),
    },
  };
});

const paraglidingOutingsLink = computed(() => {
  if (document.type !== 'w' || document.waypoint_type !== 'paragliding_takeoff') {
    return undefined;
  }
  return {
    name: 'outings',
    query: {
      act: 'paragliding',
      w: [
        document.document_id,
        ...(isWaypoint(document)
          ? [
              ...document.associations.waypoints.map(w => w.document_id),
              ...document.associations.waypoint_children.map(w => w.document_id),
            ]
          : []),
      ].join(','),
    },
  };
});

const fundraiser = isDocument(document) ? useFundraiser(document) : undefined;

const associationModal = useTemplateRef('associationModal');
const showAssociationEditor = (e: MouseEvent) => {
  e.preventDefault();
  associationModal.value?.show();
};

const missingLangs = computed(() =>
  isDocument(document) ? API_LANGS.filter(lang => !document.available_langs.includes(lang)) : [],
);
const translateModal = useTemplateRef('translateModal');
const showTranslateModal = (e: MouseEvent) => {
  e.preventDefault();
  translateModal.value?.show();
};

const reportingEmail = 'topo-fr@camptocamp.org';
const reportingSubject = t('box.tools.report-issue-subject');
const reportingBody = encodeURIComponent(
  t('box.tools.report-issu-body') + '\r\n\r\n----\r\n\r\n' + useRequestURL().href,
);

const toggleDocumentLock = async () => {
  try {
    await useC2cApi().moderator[document.protected ? 'unprotectDocument' : 'protectDocument'](document.document_id);
    document.protected = !document.protected;
  } catch {
    toast.add({ severity: 'error', summary: t('toast.error.title'), detail: t('toast.error.default'), life: 3000 });
  }
};

const mergeModal = useTemplateRef('mergeModal');
const showMergeModal = (e: MouseEvent) => {
  e.preventDefault();
  mergeModal.value?.show();
};

const { data: isAccountLocked, status: accountLockedStatus } = useAsyncData(async () => {
  if (!isModerator || document.type !== 'u') {
    return false;
  }
  return (await useC2cApi().moderator.isAccountBlocked(document.document_id)).blocked;
});
const toggleAccountLock = async () => {
  try {
    await useC2cApi().moderator[isAccountLocked.value ? 'unblockAccount' : 'blockAccount'](document.document_id);
    isAccountLocked.value = !isAccountLocked.value;
  } catch {
    toast.add({ severity: 'error', summary: t('toast.error.title'), detail: t('toast.error.default'), life: 3000 });
  }
};

const deleteLocaleModal = useTemplateRef('deleteLocaleModal');
const showDeleteLocaleModal = (e: MouseEvent) => {
  e.preventDefault();
  deleteLocaleModal.value?.show();
};

const deleteModal = useTemplateRef('deleteModal');
const showDeleteModal = (e: MouseEvent) => {
  e.preventDefault();
  deleteModal.value?.show();
};
</script>

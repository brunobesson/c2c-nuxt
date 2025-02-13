<template>
  <Box>
    {{ JSON.stringify(availableLangs) }}
    <div class="flex flex-col print:hidden">
      <!-- TODO check this is working in all case (e.g. fundraiser, etc) -->
      <BoxToolsAssociatedDocuments :document="document" />

      <div v-if="isDefaultView && availableLangs?.length" class="text-center">
        {{ $t('box.tools.other-langs') }}
        <!-- TODO styling -->
        <ul>
          <li v-for="l of availableLangs" :k="l">
            <LinkDocument :document="document" :lang="l!">{{ $t(`langs.${l}`) }}</LinkDocument>
          </li>
        </ul>
      </div>

      <NuxtLink v-if="weatherLink" :to="weatherLink" external class="link">
        <Icon icon="sun" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.weather-forecast') }}
      </NuxtLink>
      <NuxtLink v-if="directionsLink" :to="directionsLink" external class="link">
        <Icon icon="directions" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.directions') }}
      </NuxtLink>
      <NuxtLink v-if="closestDocumentsLink" :to="closestDocumentsLink" class="link">
        <Icon icon="compass" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.nearby') }}
      </NuxtLink>
      <NuxtLink v-if="paraglidingOutingsLink" :to="paraglidingOutingsLink" class="link">
        <IconActivity activity="paragliding" fixed-width class="text-[--p-text-color]" />
        {{ $t('box.tools.paragliding-outings') }}
      </NuxtLink>
      <NuxtLink v-if="fundraiser" :to="fundraiser" external class="link">
        <Icon :icon="['misc', 'drill']" fixed-width class="text-red-500" /> {{ $t('box.tools.fundraiser') }}
      </NuxtLink>
      <NuxtLink
        v-if="document.type === 'u'"
        :to="{ name: 'outings-stats', query: { u: document.document_id } }"
        class="link">
        <Icon icon="chart-bar" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.statistics') }}
      </NuxtLink>

      <!-- TODO display only if appropriate -->
      <hr />

      <NuxtLink
        v-if="document.type === 'u'"
        :to="{ name: 'whatsnew', query: { u: document.document_id } }"
        class="link">
        <Icon icon="edit" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.contributions') }}
      </NuxtLink>
      <div v-if="document.quality">
        <IconQuality :quality="document.quality" fixed-width class="text-[--p-text-color]" />&nbsp;<i18n-t
          keypath="colon"
          scope="global">
          <template #before>{{ capitalize($t('quality')) }}</template>
          <template #after>{{ $t(`quality-values.${document.quality}`) }}</template>
        </i18n-t>
      </div>
      <NuxtLink
        v-if="isEditable"
        :to="{ name: `${documentType}-edit`, params: { id: document.document_id, lang: locale } }"
        class="link">
        <Icon icon="edit" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.edit') }}
      </NuxtLink>
      <a v-if="isEditable && document.type !== 'a'" href="#" @click="showAssociationEditor($event)" class="link">
        <Icon icon="link" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.edit-associations') }}
      </a>
      <NuxtLink
        v-if="document.type !== 'u' || isModerator || document.document_id === user?.id"
        :to="{ name: documentType + '-history', params: { id: document.document_id, lang: document.cooked.lang } }"
        rel="nofollow"
        class="link">
        <Icon icon="history" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.history') }}
      </NuxtLink>
      <a v-if="isEditable && missingLangs.length > 0" href="#" @click="showTranslateModal($event)" class="link">
        <Icon icon="globe" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.translate') }}
      </a>
      <NuxtLink :href="`mailto:${reportingEmail}?subject=${reportingSubject}&body=${reportingBody}`" class="link">
        <Icon icon="exclamation-circle" fixed-width class="text-red-500" /> {{ $t('box.tools.report-issue') }}
      </NuxtLink>

      <!-- TODO display only if appropriate -->
      <hr />

      <!-- Moderator zone -->
      <template v-if="isEditable && isModerator">
        <a v-if="document.type !== 'u'" href="#" @click="toggleDocumentLock()" class="link">
          <Icon :icon="document.protected ? 'lock' : 'unlock'" fixed-width class="text-[--p-text-color]" />
          {{ document.protected ? $t('box.tools.unlock-doc') : $t('box.tools.lock-doc') }}
        </a>
        <a href="#" @click="showMergeModal($event)" class="link">
          <Icon icon="object-group" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.merge') }}
        </a>
        <a
          v-if="document.type === 'u'"
          href="#"
          @click="accountLockedStatus === 'success' && toggleAccountLock()"
          class="link"
          :class="{ 'pointer-events-none cursor-default': accountLockedStatus !== 'success' }">
          <Icon icon="user-lock" fixed-width class="text-[--p-text-color]" />
          {{ isAccountLocked ? $t('box.tools.unlock-user') : $t('box.tools.lock-user') }}
        </a>
      </template>
      <template v-if="isDeletable && isDocument(document)">
        <a v-if="document.available_langs.length > 1" href="#" @click="showDeleteLocaleModal($event)" class="link">
          <Icon icon="trash" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.delete-locale') }}
        </a>

        <a v-if="document.available_langs.length > 1" href="#" @click="showDeleteModal($event)" class="link">
          <Icon icon="trash" fixed-width class="text-[--p-text-color]" /> {{ $t('box.tools.delete') }}
        </a>
      </template>

      <!-- TODO display only if appropriate -->
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
import type { Document } from '../../api/c2c.js';
import { API_LANGS } from '../../api/lang.js';
import { useAuthStore } from '../../store/auth.js';
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
} from '../../types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument }>();

const { locale, t } = useI18n();
const route = useRoute();
const { isDefaultView, documentType } = useDocumentViewType(locale);
const { isEditable, isDeletable } = useDocumentView(locale, document);
const { isModerator, user } = useAuthStore();
const toast = useToast();

// TODO not working?
const availableLangs = computed(() => {
  if (isVersionedDocument(document)) {
    return undefined;
  }
  let currentLang = (route.params.lang as string | undefined) ?? document.cooked.lang;
  return document.available_langs.filter(lang => lang !== currentLang);
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
    name: documentType + 's',
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
  t('box.tools.report-issu-body') + '\r\n\r\n----\r\n\r\n' + window.location.href,
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

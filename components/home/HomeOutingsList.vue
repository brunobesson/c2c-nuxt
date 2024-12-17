<template>
  <div class="box">
    <h4 class="title is-3 is-capitalized">
      <NuxtLink
        :to="{
          path: '/outings',
          query: {
            qa: 'draft,great',
            offset: 0,
            limit: 100,
          },
        }"
        class="is-capitalized">
        <IconDocument type="outing" />
        {{ $t('outings') }}
      </NuxtLink>
    </h4>
    <div v-if="outingsByDate">
      <!-- TODO skeleton -->
      <div v-for="(sortedOutings, date) of outingsByDate" :key="date">
        <p class="outing-date-header is-4 is-italic has-text-weight-bold">
          <NuxtLink :to="{ path: '/outings', query: { date: `${date},${date}` } }" class="is-capitlized">
            <!-- TODO -->
            {{ longOutingDate(date + '') }}
          </NuxtLink>
        </p>
        <div class="dashboard-list">
          <HomeOutingLink v-for="outing of sortedOutings" :key="outing.document_id" :outing="outing" />
        </div>
      </div>
    </div>
    <hr />
    <h6 class="title is-6 has-text-centered">
      <NuxtLink
        :to="{
          path: '/outings',
          query: {
            qa: 'draft,great',
            bbox: '-431698,3115462,1931123,8442818',
            offset: 0,
            limit: 100,
          },
        }">
        {{ $t('more') }}
      </NuxtLink>
    </h6>
  </div>
</template>

<script setup lang="ts">
import { OUTINGS, USER_PREFERENCES, type Documents, type Outing, type UserPreferences } from '~/api/c2c.js';
import type { ISODate } from '../../types/index.js';

const { $c2cFetch } = useNuxtApp();

const { isPersonal } = defineProps<{ isPersonal: boolean }>();

const { longOutingDate } = useDate();

const { data: userPrefs } = await useAsyncData<UserPreferences | null>('user.preferences', async () => {
  if (!isPersonal) {
    return null;
  }
  return $c2cFetch<UserPreferences>(USER_PREFERENCES);
});
const outingsQuery = computed((): Record<string, any> => {
  if (!isPersonal) {
    return { limit: 40, qa: 'draft,great' };
  }
  return {
    act: userPrefs.value?.activities.join(',') || undefined,
    areas: userPrefs.value?.areas.map(({ document_id }) => document_id).join(',') || undefined,
    bbox: undefined,
    limit: 40,
    qa: 'draft,great',
  };
});
// TODO handle error & loading
const { data, status, error } = await useC2cFetch<Documents<Outing>>(OUTINGS, {
  query: outingsQuery.value,
});

const outingsByDate = computed((): Record<ISODate, Outing[]> => {
  if (!data.value) {
    return {};
  }
  const result: Record<ISODate, Outing[]> = {};
  for (const outing of data.value.documents) {
    result[outing.date_end] = result[outing.date_end] ?? [];
    result[outing.date_end].push(outing);
  }
  return result;
});
</script>

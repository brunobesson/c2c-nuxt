<template>
  <Box>
    <template #title>
      <NuxtLink
        :to="{
          path: '/outings',
          query: {
            qa: 'draft,great',
            offset: 0,
            limit: 100,
          },
        }"
        class="capitalize">
        <IconDocument type="outing" />
        {{ $t('outings') }}
      </NuxtLink>
    </template>
    <div v-if="outingsByDate">
      <!-- TODO skeleton -->
      <ul>
        <li v-for="(sortedOutings, date) of outingsByDate" :key="date">
          <NuxtLink
            :to="{ path: '/outings', query: { date: `${date},${date}` } }"
            class="block mt-4 mb-3 border-b-2 border-primary font-semibold italic text-lg capitalize">
            <!-- TODO -->
            {{ longOutingDate(date + '') }}
          </NuxtLink>
          <ul>
            <li v-for="outing of sortedOutings" :key="outing.document_id" class="[&:nth-child(even)]:bg-gray-50">
              <HomeOutingLink :outing="outing" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <template #more>
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
    </template>
  </Box>
</template>

<script setup lang="ts">
import { OUTINGS, USER_PREFERENCES, type Documents, type Outing, type UserPreferences } from '~/api/c2c.js';
import type { ISODate } from '../../types/index.js';

const { $c2cFetch } = useNuxtApp();

const { isPersonal } = defineProps<{ isPersonal: boolean }>();

const { locale } = useI18n();
const { longOutingDate } = useDate(locale);

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

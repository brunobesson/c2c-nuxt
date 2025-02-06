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
        }">
        <IconDocument type="outing" />
        {{ capitalize($t('outings')) }}
      </NuxtLink>
    </template>
    <LoadDataError v-if="status === 'error'" />
    <ul v-else>
      <li v-for="(sortedOutings, date) of outingsByDate" :key="date">
        <NuxtLink
          :to="{ path: '/outings', query: { date: `${date},${date}` } }"
          class="block mt-4 mb-3 border-b-2 border-primary font-semibold italic text-lg">
          {{ capitalize(longOutingDate(date + '')) }}
        </NuxtLink>
        <ul>
          <li v-for="outing of sortedOutings" :key="outing.document_id" class="[&:nth-child(even)]:bg-gray-50">
            <HomeOutingLink :outing="outing" />
          </li>
        </ul>
      </li>
    </ul>
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
import type { OutingListing, UserPreferences } from '~/api/c2c.js';
import type { IsoDate } from '~/types/common.js';

const { isPersonal } = defineProps<{ isPersonal: boolean }>();

const { locale } = useI18n();
const { longOutingDate } = useDate(locale);

const { data: userPrefs } = await useAsyncData<UserPreferences | null>('user.preferences', async () => {
  if (!isPersonal) {
    return null;
  }
  return useC2cApi().user.getPreferences();
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
const { data, status } = await useAsyncData(() => useC2cApi().outing.getAll(outingsQuery.value));

const outingsByDate = computed((): Record<IsoDate, OutingListing[]> => {
  if (!data.value) {
    return {};
  }
  const result: Record<IsoDate, OutingListing[]> = {};
  for (const outing of data.value.documents) {
    result[outing.date_end] = result[outing.date_end] ?? [];
    result[outing.date_end].push(outing);
  }
  return result;
});
</script>

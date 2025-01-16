<template>
  <div class="flex flex-col items-center">
    <LoadDataError v-if="error" />
    <div class="grid grid-cols-2 gap-4 min-h-full">
      <HomeFeedCard v-for="card of cards" :item="card" :key="card.id" />
    </div>
    <ProgressSpinner v-if="loading" style="width: 50px; height: 50px" strokeWidth="4" class="mt-2" />
    <ScrollTop :threshold="1500" />
  </div>
</template>

<script setup lang="ts">
import type { Feed, FeedItem } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';
import type { FeedQuery } from '../../composables/useC2cApi.js';

const { type } = defineProps<{ type: 'personal' | 'default' | 'profile' }>();
const { params } = useRoute();
const cards = ref<FeedItem[]>([]);
const canLoadMore = ref(true);
const error = ref(false);
const loading = ref(false);
const paginationToken = ref<string | undefined>(undefined);
if (import.meta.client) {
  const { isLoading } = useInfiniteScroll(
    window,
    async () => {
      try {
        onLoad(await load());
      } catch (err: unknown) {
        error.value = true;
        canLoadMore.value = false;
      }
    },
    {
      distance: 200,
      canLoadMore: () => canLoadMore.value,
    },
  );
  watchEffect(() => (loading.value = isLoading.value));
  /* 
  onMounted(async () => {
    if (useNuxtApp().payload.)
    if (cards.value.length === 0 && !isLoading.value) {
      onLoad(await load());
    }
  }); */
}

const { data: initialData, clear } = useAsyncData(async () => load(20));
watch(
  initialData,
  data => {
    if (!data) {
      loading.value = true;
      return;
    }
    paginationToken.value = data.pagination_token;
    canLoadMore.value = data.feed.length > 0;
    cards.value.push(...data.feed);
    clear(); // don't use these values again
  },
  { immediate: true },
);

async function load(limit = 10): Promise<Feed> {
  const query: FeedQuery = {
    pl: 'fr' as ApiLang, // TODO getApiLang(),
    token: paginationToken.value,
    limit,
  };
  const feed = useC2cApi().feed;
  switch (type) {
    case 'personal':
      return await feed.getPersonalFeed(query);
    case 'profile':
      return await feed.getProfileFeed(+params.id, query);
    case 'default':
    default:
      return await feed.getDefaultFeed(query);
  }
}

function onLoad(data: Feed) {
  paginationToken.value = data.pagination_token;
  canLoadMore.value = data.feed.length > 0;
  cards.value.push(...data.feed);
}
</script>

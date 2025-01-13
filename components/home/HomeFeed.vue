<template>
  <div>
    <LoadDataError v-if="status === 'error'" />
    <div class="grid grid-cols-2 gap-4">
      <HomeFeedCard v-for="item of data" :item="item" :key="item.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Feed, FeedItem } from '../../api/c2c.js';
import type { ApiLang } from '../../api/lang.js';
import type { FeedQuery } from '../../composables/useC2cApi.js';

const { type } = defineProps<{ type: 'personal' | 'default' | 'profile' }>();
const { params } = useRoute();

const paginationToken = ref<string | undefined>(undefined);
const { data, status } = useAsyncData<FeedItem[]>(async () => {
  const query: FeedQuery = {
    pl: 'fr' as ApiLang, // TODO getApiLang(),
    token: paginationToken.value,
  };
  const feed = useC2cApi().feed;
  let data: Feed;
  switch (type) {
    case 'personal':
      data = await feed.getPersonalFeed(query);
      break;
    case 'profile':
      data = await feed.getProfileFeed(+params.id, query);
      break;
    case 'default':
    default:
      data = await feed.getDefaultFeed(query);
  }
  return data.feed;
});
</script>

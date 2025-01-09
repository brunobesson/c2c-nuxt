<template>
  <Box>
    <template #title>
      <NuxtLink to="forum"><IconForum /> {{ capitalize($t('forum')) }}</NuxtLink>
    </template>
    <div>
      <LoadDataError v-if="status === 'error'" />
      <ul>
        <li v-for="topic of topics" :key="topic.id" class="[&:nth-child(even)]:bg-gray-50">
          <!-- TODO ellipsis not working because  whitespace-nowrap overflow-hidden does no respect fractioning -->
          <NuxtLink
            class="flex gap-1 pb-1 w-full hover:bg-gray-100"
            :href="getTopicUrl(topic)"
            target="_blank"
            rel="noopener"
            :title="topic.last_poster_username">
            <NuxtImg
              :src="getAvatarUrl(topic.last_poster_avatar_template)"
              class="rounded-full align-top h-full shrink-0 w-[20px]"
              loading="lazy"
              alt="Avatar" />
            <span class="align-top whitespace-nowrap overflow-hidden text-ellipsis">
              {{ topic.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <template #more>
      <NuxtLink to="forum">
        {{ $t('more') }}
      </NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts">
import { type Topic } from '~/api/forum.js';

const { messageCount = -1 } = defineProps<{ messageCount?: number }>();

const { baseUrl, getLatest } = useForumApi();

const { data, status } = useAsyncData(() => getLatest());

const topics = computed(() => {
  if (messageCount > 0 && data.value) {
    return data.value.slice(0, messageCount);
  }
  return data.value;
});

const getAvatarUrl = (avatarTemplate: string) => {
  const template = avatarTemplate.startsWith('/') ? baseUrl + avatarTemplate : avatarTemplate;
  return template.replace('{size}', '20');
};

const getTopicUrl = (topic: Topic) => {
  return `${baseUrl}/t/${topic.slug}/${topic.id}/${topic.highest_post_number}`;
};
</script>

<template>
  <Box class="print:hidden">
    <template #title>
      {{ $t('box.comments.title') }}
    </template>
    <div v-if="isOuting(document) && document.disable_comments">{{ $t('box.comments.disabled') }}</div>
    <LoadDataError v-if="status === 'error'">
      {{ $t('box.comments.error', [error?.message]) }}
    </LoadDataError>
    <div v-else>
      <div v-for="post of comments" :key="post.id" class="flex border-t-[6px] border-primary mb-6">
        <NuxtImg
          :src="getAvatarUrl(post.avatar_template, 45)"
          class="h-full w-[45px] m-4 ml-0 rounded-[4px]"
          loading="lazy"
          alt="Avatar" />
        <div class="flex flex-col grow">
          <div class="flex justify-between bg-surface-200 px-3 py-1">
            <NuxtLink :href="`${baseUrl}users/${post.username}`" class="font-semibold">
              {{ post.username }}
            </NuxtLink>
            {{ timeAgo(post.created_at) }}
          </div>
          <div class="discourse-content" v-html="post.cooked" />
        </div>
      </div>
      <div class="text-center">
        <ButtonLogin v-if="!authenticated">{{ $t('box.comments.login') }}</ButtonLogin>
        <!-- API bug with first comment creation? -->
        <Button v-else-if="document.cooked.topic_id === null" :label="$t('box.comments.first')" @click="createTopic" />
        <!-- Only the system comment exists -->
        <NuxtLink v-else-if="!comments.length" :href="discussionUrl">
          <Button :label="$t('box.comments.first')" />
        </NuxtLink>
        <NuxtLink v-else-if="allCommentDisplayed" :href="discussionUrl">
          <Button :label="$t('box.comments.continue')" />
        </NuxtLink>
        <NuxtLink v-else :href="discussionUrl">
          <Button :label="$t('box.comments.expand')" />
        </NuxtLink>
      </div>
    </div>
  </Box>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';
import type { Document } from '../../api/c2c.js';
import { useAuthStore } from '../../store/auth.js';
import { isOuting } from '../../types/common.js';

const { document } = defineProps<{ document: Document }>();

const { getTopic, getAvatarUrl, baseUrl } = useForumApi();
const { locale } = useI18n();
const { timeAgo } = useDate(locale);
const { authenticated } = useAuthStore();

const { data, status, error, refresh } = useAsyncData(async () =>
  document.cooked.topic_id ? getTopic(document.cooked.topic_id) : null,
);

const comments = computed(() => {
  if (!data.value) {
    return [];
  }
  return data.value.post_stream.posts
    .filter(({ name }) => name !== 'system')
    .map(post => ({ ...post, cooked: computeCooked(post.cooked) }));
});

const computeCooked = (cooked: string) =>
  cooked.replace(/<a class="mention" href="/g, '<a class="mention" href="' + baseUrl);

const allCommentDisplayed = computed(() => {
  if (!data.value || !data.value.posts_count) {
    return true;
  }
  return data.value.post_stream.posts.length >= data.value.posts_count;
});

const discussionUrl = computed(() => {
  if (!document.cooked.topic_id) {
    return undefined;
  }
  return `${baseUrl}t/${data.value?.slug}/${document.cooked.topic_id}/${data.value?.posts_count}`;
});

const createTopic = async () => {
  try {
    const { topic_id: topicId } = await useC2cApi().forum.createTopic(document.document_id, document.cooked.lang);
    window.location.href = `${baseUrl}t/${document.document_id}_${document.cooked.lang}/${topicId}`;
  } catch (error: unknown) {
    if (error instanceof FetchError && error.statusCode === 400 && error.data.errors[0].topic_id) {
      refresh();
    }
  }
};
</script>

<style lang="css">
/* TODO colors & all */
.discourse-content {
  margin-top: 0.5rem;

  .emoji {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  blockquote {
    background-color: #f0efeb;
    border-left: 5px solid #e9e9e9;
    border-left-color: #d0d0d0;
  }

  .quote {
    margin-top: 1em;
    margin-bottom: 1em;

    .title,
    blockquote {
      background-color: #f0efeb;
      border-left: 5px solid #e9e9e9;
      border-left-color: #d0d0d0;
    }

    .title {
      padding: 12px 12px 1px 12px;
      margin-bottom: 0;
    }

    blockquote {
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
      padding: 12px;
    }
  }

  h2 {
    margin: 30px 0 10px;
    font-size: 1.5em;
    font-weight: bold;
  }
}
</style>

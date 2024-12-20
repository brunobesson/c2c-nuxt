<template>
  <div v-show="hasAnnouncement && !hidden" class="board-publication bg-green-700 text-white print:hidden">
    <div class="p-6">
      <Button variant="text" rounded class="!absolute top-1 right-1 text-xs" @click="hide">
        <Icon icon="xmark" />
      </Button>
      <div ref="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISODateTime } from '~/types/index.js';
import type { Announcement } from '../../api/forum.js';

const hasAnnouncement = ref(false);
const updatedAt = ref<ISODateTime | undefined>(undefined);
const hidden = ref(false);
const contentEl = useTemplateRef('content');
const { data } = useForumFetch<Announcement>('/t/publication-ca.json', { lazy: true, server: false });
const lastAnnoucementRead = useLocalStorage<ISODateTime | undefined>('boardAnnoucement.updatedAt', undefined);

watch([data, contentEl], ([announcement]) => {
  if (!contentEl.value || !announcement?.tags.includes('visible')) {
    return;
  }
  const lastPost = announcement.post_stream.posts?.at(-1);
  if (!lastPost) {
    return;
  }
  updatedAt.value = lastPost.updated_at;
  if (updatedAt.value === lastAnnoucementRead.value) {
    return;
  }
  hasAnnouncement.value = true;

  const content = document.createElement('div');
  content.innerHTML = lastPost.cooked;

  contentEl.value.innerHTML = '';
  contentEl.value.appendChild(content);
});

const hide = () => {
  hidden.value = true;
  lastAnnoucementRead.value = updatedAt.value;
};
</script>

<style lang="css">
.board-publication {
  position: relative;
  margin-bottom: 0.75rem;
}

.board-publication a,
.board-publication a:hover {
  color: currentColor;
  text-decoration: underline;
}

.board-publication .meta {
  display: none;
}
</style>

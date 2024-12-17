<template>
  <div
    v-show="hasAnnouncement && !hidden"
    class="publication has-background-info has-text-white no-print"
  >
    <div class="p-5 is-info">
      <button class="delete" @click="hide" />
      <div ref="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISODateTime } from '~/types/index.js';
import { getBoardAnnouncement } from '../../api/forum.js';

const hasAnnouncement = ref(false);
const updatedAt = ref<ISODateTime | undefined>(undefined);
const hidden = ref(false);
const contentEl = useTemplateRef('content');
const { data } = getBoardAnnouncement({ lazy: true, server: false });
const lastAnnoucementRead = useLocalStorage<ISODateTime | undefined>('boardAnnoucement.updatedAt', undefined);

watch([data, contentEl], ([announcement]) => {
  if (
    !contentEl.value ||
    !announcement ||
    !announcement.tags.includes('visible')
  ) {
    return;
  }
  const lastPost =
    announcement.post_stream.posts?.[announcement.posts_count - 1];
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

<style lang="scss">
.meta {
  display: none;
}

.publication {
  position: relative;
  margin-bottom: var(--bulma-size-7);

  a,
  a:hover {
    color: currentColor;
    text-decoration: underline;
  }
}
</style>

<style lang="scss" scoped>
.delete {
  position: absolute;
  top: var(--bulma-size-7);
  right: var(--bulma-size-7);
}
</style>

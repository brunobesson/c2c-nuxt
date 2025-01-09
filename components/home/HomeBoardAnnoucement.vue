<template>
  <div v-show="hasAnnouncement && !hidden" class="relative bg-secondary-500 text-white print:hidden">
    <div class="p-6">
      <Button rounded severity="secondary" size="small" class="!absolute top-1 right-1" @click="hide">
        <Icon icon="xmark" />
      </Button>
      <div ref="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISODateTime } from '~/types/index.js';
import type { Announcement } from '../../api/forum.js';

const props = defineProps<{ data: Announcement | null }>();
const data = toRef(props.data);

const hasAnnouncement = ref(false);
const updatedAt = ref<ISODateTime | undefined>(undefined);
const hidden = ref(false);
const contentEl = useTemplateRef('content');
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

<style scoped lang="css">
:deep(strong) {
  color: var(--p-text-color);
}

:deep(a),
:deep(a:hover) {
  color: var(--p-text-color);
  text-decoration: underline;
}

:deep(.meta) {
  display: none;
}
</style>

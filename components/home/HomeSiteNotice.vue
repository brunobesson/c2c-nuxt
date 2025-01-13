<template>
  <div
    v-show="hasAnnouncement && !hidden"
    class="relative bg-secondary text-white print:hidden"
    @click="showContent = !showContent">
    <div class="p-6">
      <Button rounded severity="secondary" size="small" class="!absolute top-1 right-1" @click="hide">
        <Icon icon="xmark" />
      </Button>
      <div ref="header" />
      <div v-show="showContent" ref="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ISODateTime } from '~/types/index.js';

const hasAnnouncement = ref(false);
const updatedAt = ref<ISODateTime | undefined>(undefined);
const lastAnnoucementRead = useLocalStorage<ISODateTime | undefined>('annoucement.updatedAt', undefined);
const hidden = ref(false);
const showContent = false;
const { locale: lang } = useI18n();

const headerEl = useTemplateRef('header');
const contentEl = useTemplateRef('content');

const { data } = useAsyncData(() => useForumApi().getSiteNotice(lang.value), { pick: ['tags', 'post_stream'] });

watch([data, headerEl], ([announcement]) => {
  if (!headerEl.value || !announcement || !announcement.tags.includes('visible')) {
    return;
  }
  const lastPost = announcement.post_stream.posts?.[0];
  if (!lastPost) {
    return;
  }
  updatedAt.value = lastPost.updated_at;
  if (updatedAt.value === lastAnnoucementRead.value) {
    return;
  }
  hasAnnouncement.value = true;

  const data = document.createElement('div');
  data.innerHTML = lastPost.cooked;
  const paragraphs = data.getElementsByTagName('p');

  const [header, ...items] = paragraphs;
  headerEl.value.innerHTML = '';
  headerEl.value.appendChild(header);
  contentEl.value!.innerHTML = '';
  items.forEach(item => contentEl.value!.appendChild(item));
});

const hide = () => {
  hidden.value = true;
  lastAnnoucementRead.value = updatedAt.value;
};
</script>

<style scoped lang="css">
:deep(a),
:deep(a:hover) {
  color: var(--p-text-color);
  text-decoration: underline;
}
</style>

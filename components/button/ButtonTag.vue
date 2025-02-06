<template>
  <Button v-if="canTag" @click="toggle" :title="tooltip" variant="text" rounded :class="{ 'text-yellow-300': todo }"
    ><Icon icon="star"
  /></Button>
</template>

<script setup lang="ts">
import type { Document } from '../../api/c2c.js';
import { useAuthStore } from '../../store/auth.js';

const { document } = defineProps<{ document: Document }>();
const { authenticated, user } = useAuthStore();
const { t } = useI18n();
const {
  tags: { isTagged, add, remove },
} = useC2cApi();
const toast = useToast();

const { data: todo } = useAsyncData(async () => (await isTagged(document)).todo);
const canTag = computed(() => document.type === 'r' && authenticated);
const tooltip = computed(() => (todo ? t('todo.stop') : t('todo.start')));

const toggle = async () => {
  try {
    await (todo ? remove : add)(document);
    todo.value = !todo.value;
  } catch {
    toast.add({ severity: 'error', summary: t('toast.error.title'), detail: t('toast.error.default'), life: 3000 });
  }
};
</script>

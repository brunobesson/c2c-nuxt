<template>
  <Button
    v-if="canFollow"
    @click="toggle"
    :title="tooltip"
    variant="text"
    rounded
    :class="{ 'text-yellow-300': followed }"
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
  user: { isFollowing, follow, unfollow },
} = useC2cApi();
const toast = useToast();

const canFollow = computed(() => document.type === 'u' && authenticated && user?.id !== document.document_id);
const { data: followed } = useAsyncData(async () =>
  canFollow.value ? (await isFollowing(document.document_id)).is_following : false,
);
const tooltip = computed(() => (followed ? t('following.stop') : t('following.start')));

const toggle = async (event: Event) => {
  try {
    await (followed ? unfollow : follow)(document.document_id);
    followed.value = !followed.value;
  } catch {
    toast.add({ severity: 'error', summary: t('toast.error.title'), detail: t('toast.error.default'), life: 3000 });
  }
};
</script>

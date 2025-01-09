<template>
  <Drawer
    v-model:visible="visible"
    position="top"
    :dismissable="false"
    :show-close-icon="false"
    :header="$t('gdpr.banner.title')"
    class="!h-auto print:hidden tablet:!w-1/2">
    <i18n-t keypath="gdpr.banner.message" class="prose">
      <a href="#" @click="showGdprModal()">{{ $t('gdpr.banner.configure') }}</a>
    </i18n-t>
    <template #footer>
      <div class="flex justify-center gap-2">
        <Button :label="$t('gdpr.banner.denyall')" severity="danger" @click="acceptGdpr(false)" />
        <Button :label="$t('gdpr.banner.allowall')" @click="acceptGdpr(true)" />
      </div>
    </template>
  </Drawer>
  <GdprModal ref="gdprModal" @close="visible = false"></GdprModal>
</template>

<script setup lang="ts">
import { useGdprStore } from '~/store/gdpr.js';
import type GdprModal from './GdprModal.vue';

const userHasInteracted = ref(false);
const gdprModal = useTemplateRef<InstanceType<typeof GdprModal>>('gdprModal');
const { get: getGdpr, setAll } = useGdpr();
const visible = ref(false);
watch(
  userHasInteracted,
  () => {
    visible.value = getGdpr().value.date === 0 && userHasInteracted.value;
  },
  { once: true },
);

onBeforeMount(() => {
  window.addEventListener('scroll', firstUserInteraction);
  window.addEventListener('keydown', firstUserInteraction);
  window.addEventListener('resize', firstUserInteraction);
  window.addEventListener('click', firstUserInteraction);
});

onMounted(() => {
  useGdprStore().$onAction(({ name }) => {
    if (name === 'openGdprDialog') {
      showGdprModal();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', firstUserInteraction);
  window.removeEventListener('keydown', firstUserInteraction);
  window.removeEventListener('resize', firstUserInteraction);
  window.removeEventListener('click', firstUserInteraction);
});

const showGdprModal = () => {
  gdprModal.value?.show();
};

const acceptGdpr = (accept: boolean) => {
  setAll(accept);
  visible.value = false;
};

const firstUserInteraction = () => {
  window.removeEventListener('scroll', firstUserInteraction);
  window.removeEventListener('keydown', firstUserInteraction);
  window.removeEventListener('resize', firstUserInteraction);
  window.removeEventListener('click', firstUserInteraction);

  userHasInteracted.value = true;
};
</script>

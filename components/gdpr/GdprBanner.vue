<template>
  <div class="no-print">
    <div class="gdpr-content" :class="{ active: active }">
      <h4 class="title">{{ $t('gdpr.banner.title') }}</h4>
      <div class="message has-text-justified">
        <i18n-t keypath="gdpr.banner.message">
          <a @click="showGdprModal()">{{ $t('gdpr.banner.configure') }}</a>
        </i18n-t>
      </div>
      <div class="buttons mt-2 is-flex is-justify-content-flex-end">
        <button @click="acceptGdpr(false)" class="button is-danger">
          {{ $t('gdpr.banner.denyall') }}
        </button>
        <button @click="acceptGdpr(true)" class="button is-primary">
          {{ $t('gdpr.banner.allowall') }}
        </button>
      </div>
    </div>
    <GdprModal ref="gdprModal"></GdprModal>
  </div>
</template>

<script setup lang="ts">
import { useGdprStore } from '../../store/gdpr.js';
import GdprModal from './GdprModal.vue';

const userHasInteracted = ref(false);
const gdprModal = useTemplateRef<InstanceType<typeof GdprModal>>('gdprModal');
const { get: getGdpr, setAll } = useGdpr();
const active = computed(() => !getGdpr() && userHasInteracted);

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
};

const firstUserInteraction = () => {
  window.removeEventListener('scroll', firstUserInteraction);
  window.removeEventListener('keydown', firstUserInteraction);
  window.removeEventListener('resize', firstUserInteraction);
  window.removeEventListener('click', firstUserInteraction);

  userHasInteracted.value = true;
};
</script>

<style lang="scss" scoped>
.gdpr-content {
  z-index: 30;
  position: fixed;
  top: 0;
  padding: 10px;

  margin: 0 auto;
  flex-direction: column;
  display: flex;
  background-color: white;
  box-shadow: none;
  transform: translateY(-100%);
  transition: transform 0.25s ease-in-out;

  &.active {
    box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 6px 0;
    transform: translateY(0);
  }
}

@include mixins.desktop {
  .gdpr-content {
    width: 50%;
    left: calc(25% - 10px);

    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>

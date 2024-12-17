<template>
  <ModalWindow ref="modalWindow">
    <template #header>
      <div class="has-text-centered">
        <Icon icon="user-shield" />
        <span>{{ $t('gdpr.modal.header') }}</span>
      </div>
    </template>

    <div class="columns">
      <div class="column">
        <div class="is-flex is-justify-content-space-between is-align-items-baseline">
          <h2 class="is-size-3">{{ $t('gdpr.modal.necessary-cookies') }}</h2>
          <div class="field">
            <input type="checkbox" id="necessary" name="necessary" class="switch is-rounded" checked disabled />
            <label for="necessary"></label>
          </div>
        </div>
        <p>
          {{ $t('gdpr.modal.necessary-cookies-details') }}
        </p>
      </div>
      <div class="column">
        <div class="is-flex is-justify-content-space-between is-align-items-baseline">
          <h2 class="is-size-3">{{ $t('gdpr.modal.statistical-cookies') }}</h2>
          <div class="field">
            <input
              type="checkbox"
              id="statistics"
              name="statistics"
              class="switch is-rounded"
              v-model="gdpr.statistics" />
            <label for="statistics"></label>
          </div>
        </div>
        <p>
          {{ $t('gdpr.modal.statistical-cookies-details') }}
        </p>
        <div class="is-flex is-justify-content-space-between is-align-items-baseline">
          <h2 class="is-size-3">{{ $t('gdpr.modal.social-cookies') }}</h2>
          <div class="field">
            <input type="checkbox" id="social" name="social" class="switch is-rounded" v-model="gdpr.social" />
            <label for="social"></label>
          </div>
        </div>
        <p>
          {{ $t('gdpr.modal.social-cookies-details') }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="buttons is-flex is-justify-content-flex-end">
        <button class="button" @click="hide">{{ $t('cancel') }}</button>
        <button class="button is-primary" @click="submit">
          {{ $t('submit') }}
        </button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import ModalWindow from '../modal/ModalWindow.vue';

const modalWindow = useTemplateRef<InstanceType<typeof ModalWindow>>('modalWindow');
const { get: getGdpr, set: setGdpr } = useGdpr();
const gdpr = computed(() => getGdpr() ?? { statistics: false, social: false });
const show = () => {
  modalWindow.value?.show();
};

const hide = () => {
  modalWindow.value?.hide();
};

const submit = () => {
  setGdpr(gdpr.value);
  hide();
};

defineExpose({ show, hide });
</script>

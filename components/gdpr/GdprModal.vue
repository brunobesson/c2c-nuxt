<template>
  <Dialog v-model:visible="visible" modal class="max-w-[1024px]">
    <template #header>
      <h1 class="text-center text-xl font-bold grow">
        <Icon icon="user-shield" /> <span>{{ $t('gdpr.modal.header') }}</span>
      </h1>
    </template>

    <div class="mobile:grid mobile:grid-cols-2 mobile:gap-2">
      <div>
        <div class="flex justify-between items-center">
          <h2 class="text-xl">{{ $t('gdpr.modal.necessary-cookies') }}</h2>
          <ToggleSwitch v-model="checked" disabled />
        </div>
        <p>
          {{ $t('gdpr.modal.necessary-cookies-details') }}
        </p>
      </div>
      <div>
        <div class="flex justify-between items-center">
          <h2 class="text-xl">{{ $t('gdpr.modal.statistical-cookies') }}</h2>
          <ToggleSwitch v-model="gdpr.statistics" />
        </div>
        <p>
          {{ $t('gdpr.modal.statistical-cookies-details') }}
        </p>
        <div class="flex justify-between items-center">
          <h2 class="text-xl">{{ $t('gdpr.modal.social-cookies') }}</h2>
          <ToggleSwitch v-model="gdpr.social" />
        </div>
        <p>
          {{ $t('gdpr.modal.social-cookies-details') }}
        </p>
      </div>
    </div>

    <template #footer>
      <Button severity="secondary" @click="hide">{{ $t('cancel') }}</Button>
      <Button @click="submit" autofocus>
        {{ $t('submit') }}
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const { get: getGdpr, set: setGdpr } = useGdpr();
const gdpr = getGdpr();
const visible = ref(false);
const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
  emit('close');
};

const submit = () => {
  setGdpr(gdpr.value);
  hide();
};

defineExpose({ show, hide });

const checked = ref(true);
</script>

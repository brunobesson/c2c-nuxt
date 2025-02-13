<template>
  <Dialog v-model:visible="visible" modal>
    <template #header>
      <h1 class="text-center text-xl font-bold grow">
        {{ $t('delete-modal.title') }}
      </h1>
    </template>

    <div>TODO</div>

    <template #footer>
      <Button @click="hide">{{ $t('close') }}</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const visible = ref(false);
const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
  emit('close');
};
defineExpose({ show, hide });
</script>

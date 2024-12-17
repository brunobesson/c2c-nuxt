<template>
  <div
    class="modal"
    :class="{ 'is-active': visible, 'is-wide': wide, 'is-small': small }"
  >
    <div
      class="modal-background"
      @click="hide"
      :class="{ 'is-transparent': hasTransparentShader }"
    />
    <div
      class="modal-content"
      :class="{ 'has-background-danger has-text-white-bis': isDanger }"
    >
      <header v-if="$slots.header" class="title is-3">
        <button
          class="delete is-pulled-right"
          aria-label="close"
          @click="hide"
        />
        <slot name="header" />
      </header>
      <button
        v-else
        class="delete is-pulled-right"
        aria-label="close"
        @click="hide"
      />
      <slot>Modal content</slot>
      <footer v-if="$slots.footer" class="is-3">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  wide = false,
  small = false,
  isDanger = false,
  hasTransparentShader = false,
} = defineProps<{
  wide?: boolean;
  small?: boolean;
  isDanger?: boolean;
  hasTransparentShader?: boolean;
}>();
const visible = ref(false);
const emit = defineEmits(['show', 'hide']);

const show = () => {
  visible.value = true;
  emit('show');
};

const hide = () => {
  visible.value = false;
  emit('hide');
};

defineExpose({ show, hide });
</script>

<style scoped lang="scss">
.modal-content {
  background: white;
  border-radius: 4px;
  padding: 1.5rem;
}

.is-transparent {
  background-color: #00000000;
}

.is-wide .modal-content {
  width: 95%;
  padding: 2%;
}

.is-small .modal-content {
  width: 30rem;
  max-width: 95%;
}

.title {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1.5rem;
}
</style>

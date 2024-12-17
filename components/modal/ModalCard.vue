<template>
  <div class="modal" :class="{ 'is-active': visible, 'is-wide': wide }">
    <div class="modal-background" @click="hide" />
    <div class="modal-card">
      <header v-if="$slots.title" class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title" />
        </p>
        <button class="delete" aria-label="close" @click="hide" />
      </header>
      <section class="modal-card-body">
        <slot>Modal content</slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer">Modal footer</slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const { wide = false } = defineProps<{ wide?: boolean }>();
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

defineExpose({ hide, show });
</script>

<style lang="css" scoped>
.is-wide .modal-card {
  width: 95%;
  padding: 2%;
}
</style>

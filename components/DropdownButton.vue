<template>
  <div class="dropdown" :class="{ 'is-active': isActive }" ref="root">
    <div class="dropdown-trigger" @click="isActive = !isActive && !disabled">
      <span aria-haspopup="true" :aria-controls="'dropdown-menu-' + id">
        <slot name="trigger" />
      </span>
    </div>

    <div :id="'dropdown-menu-' + id" class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';

defineProps<{ disabled?: boolean }>();
const isActive = ref(false);
const id = useId();
const el = useTemplateRef('root');

onClickOutside(el, () => {
  isActive.value = false;
});

defineExpose({ isActive });
</script>

<style scoped lang="scss">
.dropdown-menu {
  @include mixins.mobile {
    max-width: 100%;
  }
}
</style>

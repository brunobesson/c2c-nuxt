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
defineProps<{ disabled?: boolean }>();
const isActive = ref(false);
const id = useId();
const el = useTemplateRef('root');

onMounted(() => {
  window.addEventListener('click', onClick);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', onClick);
});

const onClick = (event: MouseEvent) => {
  // close dropdown when clicked outside
  if (event.target instanceof Node && !el.value!.contains(event.target)) {
    isActive.value = false;
  }
};
</script>

<style scoped lang="scss">
.dropdown-menu {
  @include mixins.mobile {
    max-width: 100%;
  }
}
</style>

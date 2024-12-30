<template>
  <div @click="toggle" aria-haspopup="true" aria-controls="'dropdown-menu-' + id">
    <slot name="trigger" />
  </div>
  <Menu ref="menu" :id="'dropdown-menu-' + id" :popup="true" :model="items" class="mobile:max-w-full">
    <template #item="{ item, props }">
      <slot name="item" :item="item" :props="props" />
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem';

defineProps<{ items: MenuItem[] }>();
const menu = useTemplateRef('menu');

const id = useId();

function toggle(event: Event) {
  menu.value?.toggle(event);
}
</script>

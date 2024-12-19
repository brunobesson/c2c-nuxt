<template>
  <!-- TODO rename component to dropdownmenu -->
  <Button type="button" @click="toggle" aria-haspopup="true" aria-controls="'dropdown-menu-' + id" :disabled="disabled">
    <slot name="trigger" />
  </Button>
  <Menu ref="menu" :id="'dropdown-menu-' + id" :popup="true" :model="items" class="mobile:max-w-ful">
    <template #item="{ item, props }">
      <slot name="item" :item="item" :props="props" />
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem';

defineProps<{ items: MenuItem[]; disabled?: boolean }>();
const menu = useTemplateRef('menu');

const id = useId();

function toggle(event: Event) {
  menu.value?.toggle(event);
}
</script>

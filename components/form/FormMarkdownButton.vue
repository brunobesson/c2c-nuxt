<template>
  <Button :disabled :title="tooltip" :href @click="click()"> <Icon :icon /> {{ text }} </Button>
</template>

<script setup lang="ts">
const { disabled = false, href } = defineProps<{
  icon: string;
  text?: string;
  tooltip?: string;
  href?: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['click']);
const click = () => {
  if (disabled) {
    return;
  }
  if (href) {
    window.open(href, '_blank', 'noopener, noreferrer');
  }
  emit('click');
};
</script>

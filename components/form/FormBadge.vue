<template>
  <span @click="handleChange(value)" :class="checked ? 'bg-green-500' : 'bg-gray-600'">
    {{ $t(`${field}-values.${value}`) }}
  </span>
</template>

<script setup lang="ts">
const { field, value } = defineProps<{ field: string; value: string }>();

const { checked, handleChange } = useField(() => field, undefined, { type: 'checkbox', checkedValue: value });
</script>

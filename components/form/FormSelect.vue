<template>
  <FormLabel :field :label :errorMessage />
  <select v-model="value">
    <option v-for="option of options" :key="option" :value="option">{{ $t(`${field}-values.${option}`) }}</option>
  </select>
</template>

<script setup lang="ts">
const { field } = defineProps<{ field: string; options: string[]; label?: string }>();

const { value, errorMessage } = useField(() => field);
</script>

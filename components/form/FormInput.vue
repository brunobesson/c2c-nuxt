<template>
  <FormLabel :field :label :errorMessage />
  <input :type :id="field" :placeholder v-model="value" />
</template>

<script setup lang="ts">
const { field, type = 'text' } = defineProps<{
  field: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
}>();

const { value, errorMessage } = useField(() => field);
</script>

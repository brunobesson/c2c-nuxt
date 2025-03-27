<template>
  <FormLabel :field :label :errorMessage />
  <FormBadge v-for="option of options" :key="option" :field :i18n-field :value="option" />
</template>

<script setup lang="ts">
const { field } = defineProps<{ field: string; options: string[]; label?: string; i18nField?: string }>();
const errors = useFormErrors();
const errorMessage = computed(() => errors.value[field as keyof typeof errors.value]);
</script>

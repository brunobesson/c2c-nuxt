<template>
  <LabelValue v-if="hasValue" :label="label">
    {{ output }}
  </LabelValue>
</template>

<script setup lang="ts">
const { value, i18n } = defineProps<{ value: string[]; label: string; i18n?: string }>();

const { t } = useI18n();
const { hasValue } = useField(value);
const output = computed(() => value.map(v => (i18n ? t(`${i18n}.${v}`) : v)).join(', '));
</script>

<template>
  <LabelValue v-if="hasValue" :label="label">
    {{ output }}
  </LabelValue>
</template>

<script setup lang="ts">
const { value, i18n } = defineProps<{ value: string | undefined; label: string; i18n?: string }>();

const { t } = useI18n();
const { hasValue } = useField(value);
const output = computed(() => (i18n ? t(`${i18n}.${value}`) : value));
</script>

<template>
  <span
    @click="handleChange(activity)"
    :title="showLabel ? undefined : $t(`activity-values.${activity}`)"
    class="cursor-pointer select-none transition-colors [&_svg]:rounded-full [&_svg]:bg-white [&_svg]:drop-shadow [&_svg]:transition-shadow-md [&_svg:hover]:drop-shadow-lg"
    :class="[
      checked ? 'text-secondary' : 'text-gray-400',
      showLabel ? 'w-[100px] inline-flex flex-col [&_svg]:grid [&_svg]:justify-center' : '',
    ]">
    <IconActivity :activity class="text-5xl" :class="[showLabel ? 'grid justify-center' : '']" />
    <span v-if="showLabel" class="text-center">{{ $t(`activity-values.${activity}`) }}</span>
  </span>
</template>

<script setup lang="ts">
import { type Activity } from '~/api/c2c.js';

const {
  field,
  activity,
  showLabel = false,
} = defineProps<{ field: string; activity: Activity; showLabel?: boolean }>();

const { checked, handleChange } = useField(() => field, undefined, { type: 'checkbox', checkedValue: activity });
</script>

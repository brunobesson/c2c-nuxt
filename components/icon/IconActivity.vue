<template>
  <Icon :icon="['activity', activity]" :class="'no-print'" />
</template>

<script setup lang="ts">
import type { Activity } from '~/api/c2c.js';

defineProps<{ activity: Activity }>();
</script>

<template>
  <Activities :activities="activities" class="text-primary text-xl" />
</template>

<script setup lang="ts">
import type { Activity } from '../../api/c2c.js';

defineProps<{ activities: Activity[] }>();
</script>

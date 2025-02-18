<template>
  <LinkDocument :document="outing">
    <PrettyOuting :outing="outing" />
  </LinkDocument>
</template>

<script setup lang="ts">
import type { OutingListing } from '../../api/c2c.js';

defineProps<{ outing: OutingListing }>();
</script>

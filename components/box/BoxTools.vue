<template>
  <Box> TODO toolbox </Box>
</template>

<script setup lang="ts">
import type { Document } from '../../api/c2c.js';
import type { VersionedDocument } from '../../types/common.js';

defineProps<{ document: Document | VersionedDocument }>();
</script>

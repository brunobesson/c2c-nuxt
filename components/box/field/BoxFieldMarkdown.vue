<template>
  <div v-if="value">
    <Panel header=" " toggleable> Blah bla h blaaba </Panel>
  </div>
</template>

<script setup lang="ts">
import type { ApiLang } from '../../api/lang.js';

defineProps<{ value: string; lang: ApiLang }>();
</script>

<template>
  <Icon :class="'icon-condition-' + condition" :icon="[condition !== null ? 'fas' : 'far', 'circle']" />
</template>

<script setup lang="ts">
defineProps<{ condition?: string }>();
</script>

<style scoped lang="css">
.icon-condition-excellent {
  color: green;
}

.icon-condition-good {
  color: #9acd32;
}

.icon-condition-average {
  color: yellow;
}

.icon-condition-poor {
  color: red;
}

.icon-condition-awful {
  color: #8b0000;
}

.icon-condition-null {
  color: lightgrey;
}
</style>

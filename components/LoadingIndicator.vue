<template>
  <div
    class="loading-indicator absolute top-[--navbar-height] tablet:ml-[--sidemenu-width] tablet:w-[calc(100%-var(--sidemenu-width))] h-[2px] z-[26] w-full pointer-events-none"
    :class="[isLoading ? 'bg-primary-200' : 'bg-primary']"></div>
  <div
    v-if="isLoading || error"
    class="loading-indicator absolute top-[--navbar-height] tablet:ml-[--sidemenu-width] tablet:w-[calc(100%-var(--sidemenu-width))] h-[2px] z-[27] w-full pointer-events-none bg-primary origin-left [transition:transform_0.1s,height_0.4s,opacity_0.4s]"
    :class="{ '!bg-red-600': error }"
    :style="{ backgroundSize: `${(100 / progress) * 100}% auto`, transform: `scaleX(${progress}%)` }"></div>
</template>
<script setup lang="ts">
const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator();

defineExpose({
  progress,
  isLoading,
  error,
  start,
  finish,
  clear,
});
</script>

<style scoped lang="css">
#app:has(.data-retrieval-error) .loading-indicator {
  background-color: theme(colors.red.600) !important;
}
</style>

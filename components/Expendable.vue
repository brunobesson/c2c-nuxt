<template>
  <!-- TODO styling -->
  <Panel toggleable>
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <slot />
  </Panel>
</template>

<template>
  <Card>
    <template #title v-if="$slots.title">
      <h1 class="text-2xl">
        <slot name="title" />
      </h1>
    </template>
    <template #content>
      <slot />
    </template>
    <template #footer v-if="$slots.more">
      <div class="flex items-center justify-center border-t">
        <div class="pt-3 font-medium">
          <slot name="more" />
        </div>
      </div>
    </template>
  </Card>
</template>

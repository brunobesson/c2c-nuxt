<template>
  <div class="w-[150px] h-[150px]">
    <NuxtLink
      :to="to"
      class="box-border w-[130px] h-[130px] rounded-full border-solid border-2 border-white bg-gray-500/40 text-gray-200 text-xl relative top-[8px] left-[8px] flex flex-col justify-center text-center transition-transform duration-200 hover:scale-105 hover:bg-white/50">
      <IconDocument
        v-if="
          typeof icon === 'string' &&
          ['area', 'article', 'book', 'image', 'map', 'outing', 'profile', 'route', 'waypoint', 'xreport'].includes(
            icon,
          )
        "
        :type="icon" />
      <Icon v-else :icon="icon" />
      <span>{{ capitalize(label) }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ to: string; label?: string; icon: string | string[] }>();
</script>

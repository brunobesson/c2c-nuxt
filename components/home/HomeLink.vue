<template>
  <LinkDocument :document="document" class="flex items-center hover:bg-gray-100">
    <Activities
      :activities="document.activities"
      class="max-mobile:grid max-mobile:grid-cols-2 max-mobile:w-8 text-2xl/7" />
    <span class="grow px-1">
      <span class="after:content-['\0000a0\002022\0000a0']"><DocumentTitle :document="document" /></span>
      <span v-for="area of rangeAreas" class="italic comma"
        ><DocumentTitle :key="area.document_id" :document="area"
      /></span>
    </span>
    <span class="text-right">
      <slot />
    </span>
  </LinkDocument>
</template>

<script setup lang="ts">
const { document } = defineProps<{ document: any }>(); // TODO

const rangeAreas = computed(() => {
  let areas = document.areas.filter((area: any) => area.area_type === 'range'); // TODO
  if (areas.length) {
    return areas;
  }
  areas = document.areas.filter((area: any) => area.area_type === 'admin_limits'); // TODO
  if (areas.length) {
    return areas;
  }
  return document.areas;
});
</script>

<template>
  <HomeLink :document="outing">
    <span class="gap-1 max-mobile:grid max-mobile:grid-cols-2 max-mobile:direction-rtl max-mobile:w-8 mobile:flex">
      <MarkerQuality :quality="outing.quality" />
      <MarkerSoftMobility v-if="outing.public_transport" />
      <MarkerCondition :condition="outing.condition_rating" />
      <MarkerGpsTrace v-if="outing.geometry.has_geom_detail" />
      <MarkerImageCount :image-count="outing.img_count" />
    </span>
  </HomeLink>
</template>

<script setup lang="ts">
import type { OutingListing} from '~/api/c2c.js';

const { outing } = defineProps<{ outing: OutingListing }>();
</script>

<template>
  <span>
    <span>
      {{ outing.date_end }}
      &hairsp;&bull;&hairsp;
    </span>
    <DocumentTitle :document="outing" />
    <span>
      <Activities :activities="outing.activities" />
      &hairsp;&bull;&hairsp;
      {{ outing.author.name }}
      &hairsp;&bull;&hairsp;
      <MarkerCondition :condition="outing.condition_rating" />
      <MarkerQuality :quality="outing.quality" />
      <MarkerImageCount v-if="outing.img_count !== 0" :image-count="outing.img_count" />
      <MarkerGpsTrace v-if="outing.geometry.has_geom_detail" />
      <MarkerSoftMobility v-if="outing.public_transport" />
    </span>
  </span>
</template>

<script setup lang="ts">
import type { OutingListing } from '../../api/c2c.js';

defineProps<{ outing: OutingListing }>();
</script>

<template>
  <HomeLink :document="outing">
    <span class="outing-icons is-grid" :class="nbIconsClass">
      <MarkerQuality :quality="outing.quality" />
      <MarkerSoftMobility v-if="outing.public_transport" />
      <MarkerCondition :condition="outing.condition_rating" />
      <MarkerGpsTrace v-if="outing.geometry.has_geom_detail" />
      <MarkerImageCount :image-count="outing.img_count" />
    </span>
  </HomeLink>
</template>

<script setup lang="ts">
const { outing } = defineProps<{ outing: any }>(); // TODO

const nbIconsClass = computed(() => {
  let result = 0;

  if (outing.img_count > 0) {
    result = result + 1;
  }
  if (outing.public_transport) {
    result = result + 1;
  }
  if (outing.geometry.has_geom_detail) {
    result = result + 1;
  }
  if (outing.quality !== null) {
    result = result + 1;
  }
  if (outing.condition_rating !== null) {
    result = result + 1;
  }

  return 'is-' + result + '-icons';
});
</script>

<style scoped lang="scss">
.is-grid {
  display: grid;
  direction: rtl;
}

.is-1-icons {
  grid-template-columns: repeat(1, 1fr);
}

.is-2-icons {
  grid-template-columns: repeat(2, 1fr);
}

.is-3-icons {
  grid-template-columns: repeat(3, 1fr);
}

.is-4-icons {
  grid-template-columns: repeat(4, 1fr);
}

.is-5-icons {
  grid-template-columns: repeat(5, 1fr);
}

@include mixins.mobile {
  .is-2-icons,
  .is-3-icons,
  .is-4-icons {
    grid-template-columns: repeat(2, 1fr);
  }

  .is-5-icons {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

<style lang="scss">
.outing-icons.is-grid span {
  padding: 0.1rem;
}
</style>

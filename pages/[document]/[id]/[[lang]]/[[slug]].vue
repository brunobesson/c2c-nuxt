<template>
  <p>
    Hello {{ route.params.document }}/{{ route.params.id }}/{{
      route.params.lang
    }}
  </p>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (
    route // TODO factorize
  ) =>
    [
      'area',
      'article',
      'book',
      'image',
      'map',
      'outing',
      'profile',
      'route',
      'waypoint',
      'xreport',
    ].includes(route.params.document as string),
});
const route = useRoute();
</script>

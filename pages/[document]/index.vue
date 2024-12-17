<template>
  <p>Helloooo {{ route.params.document }}</p>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (
    route // TODO factorize
  ) =>
    [
      'areas',
      'articles',
      'books',
      'images',
      'maps',
      'outings',
      'profiles',
      'routes',
      'waypoints',
      'xreports',
    ].includes(route.params.document as string),
});
const route = useRoute();
</script>

<template>
  <Button as="a" :href="helloAssoUrl" class="text-center" target="_blank" rel="noopener noreferrer">
    <IconJoinUs fixed-width />
    <span class="max-mobile:hidden capitalize">{{ $t('navigation.join') }}</span>
  </Button>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
const helloAssoUrl = `https://www.helloasso.com/associations/camptocamp-association/adhesions/adhesions-${year}-camptocamp-association`;
</script>

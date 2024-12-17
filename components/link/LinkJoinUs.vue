<template>
  <span>
    <a :href="helloAssoUrl" target="_blank" rel="noreferrer">
      <slot />
    </a>
  </span>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
const helloAssoUrl = `https://www.helloasso.com/associations/camptocamp-association/adhesions/adhesions-${year}-camptocamp-association`;
</script>

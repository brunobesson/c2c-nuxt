<template>
    <Icon icon="tachometer-alt" :fixed-width="fixedWidth" />
  </template>
  
  <script lang="ts" setup>
  import { fixedWidthProps } from '~/props/fixed-width.js';
  
  defineProps(fixedWidthProps);
  </script>
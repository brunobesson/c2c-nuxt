<template>
  <aside>
    <!-- <NuxtLink to="topoguide">Topoguide</NuxtLink> -->
    <ul>
      <li v-for="locale in availableLocales" :key="locale.code">
        <a href="#" @click.prevent.stop="setLocale(locale.code)">
          {{ locale.code }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
);
</script>

<style lang="scss" scoped>
aside {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  background: var(--bulma-white);
}
</style>

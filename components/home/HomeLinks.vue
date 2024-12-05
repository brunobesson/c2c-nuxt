<template>
  <div class="box">
    <h4 class="title is-3">
      <NuxtLink to="/article/107228">
        {{ $t('Useful links') }}
      </NuxtLink>
    </h4>
    <div>
      <ul>
        <li>
          <NuxtLink to="/article/107228">
            {{ $t('Get ready for your climb') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/yeti">
            {{ $t('Yeti: a tool to assess the avalanche risk') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            external
            href="https://www.metaskirando.ovh/"
            title="Metaskirando"
          >
            {{ $t('Metaskirando: an aggregator of ski outings in Europe') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/serac">
            {{ $t('SERAC: accidents and incidents in the mountains') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/article/106726">
            {{ $t('Camptocamp Association') }}
          </NuxtLink>
        </li>
        <li>
          <Nuxtlink
            external
            href="https://www.helloasso.com/associations/camptocamp-association/"
            title="Helloasso"
          >
            {{ $t('Want to join us? Or donate?') }}'
          </Nuxtlink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style-type: disc !important;
  padding-left: var(--bulma-size-6);
}

h4 {
  padding-bottom: var(--bulma-size-7) !important;
  margin-bottom: var(--bulma-size-7) !important;
}

li:hover {
  background: var(--bulma-background);
}

h4 > a,
li > a {
  color: $color-text !important;
}

h4 > a:hover {
  color: $color-link !important;
}
</style>

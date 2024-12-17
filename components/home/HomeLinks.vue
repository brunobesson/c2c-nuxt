<template>
  <div class="box">
    <h4 class="title is-3">
      <NuxtLink to="/articles/107228">
        {{ $t('home.links.title') }}
      </NuxtLink>
    </h4>
    <div>
      <ul>
        <li>
          <NuxtLink to="/articles/107228">
            {{ $t('home.links.prepare') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/yeti">
            {{ $t('home.links.yeti') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://www.metaskirando.ovh/" title="Metaskirando">
            {{ $t('home.links.metaskirando') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/serac">
            {{ $t('home.links.serac') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/articles/106726">
            {{ $t('camptocamp-association') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink href="https://www.helloasso.com/associations/camptocamp-association/" title="Helloasso">
            {{ $t('home.links.donate') }}
          </NuxtLink>
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

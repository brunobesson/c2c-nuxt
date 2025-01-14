<template>
  <Box>
    <template #title>
      <NuxtLink to="/articles/107228">
        {{ $t('home.links.title') }}
      </NuxtLink>
    </template>
    <ul class="list-disc pl-4">
      <li>
        <NuxtLink to="/articles/107228" class="block w-full hover:bg-hover">
          {{ $t('home.links.prepare') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/yeti" class="block w-full hover:bg-hover">
          {{ $t('home.links.yeti') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink href="https://www.metaskirando.ovh/" title="Metaskirando" class="block w-full hover:bg-hover">
          {{ $t('home.links.metaskirando') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/serac" class="block w-full hover:bg-hover">
          {{ $t('home.links.serac') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/articles/106726" class="block w-full hover:bg-hover">
          {{ $t('camptocamp-association') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          external
          href="https://www.helloasso.com/associations/camptocamp-association/"
          target="_blank"
          rel="noopener"
          title="Helloasso"
          class="block w-full hover:bg-hover">
          {{ $t('home.links.donate') }}
        </NuxtLink>
      </li>
    </ul>
  </Box>
</template>

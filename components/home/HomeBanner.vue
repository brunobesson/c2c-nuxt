<template>
  <!-- TODO styling -->
  <Box>
    <Accordion v-model:value="panelValue">
      <AccordionPanel value="intro" class="!border-none">
        <AccordionHeader>{{ $t('home.intro') }}</AccordionHeader>
        <AccordionContent>
          <div class="columns">
            <div class="column is-12-mobile">
              <div class="subtitle">
                {{ $t('home.banner.title') }}
              </div>
              <div class="columns">
                <div class="column is-12-mobile">
                  <div>
                    <p>{{ $t('home.banner.available') }}</p>
                    <ul>
                      <li>
                        <IconDocument type="route" fixed-width />
                        <NuxtLink to="routes">{{ $t('home.banner.routes') }}</NuxtLink>
                      </li>
                      <li>
                        <IconDocument type="outing" fixed-width />
                        <NuxtLink to="outings">
                          {{ $t('home.banner.outings') }}
                        </NuxtLink>
                      </li>
                      <li>
                        <IconDocument type="xreport" fixed-width />
                        {{ $t('home.banner.xreports') }}
                        <NuxtLink to="serac">SERAC</NuxtLink>
                      </li>
                      <li>
                        <IconYeti fixed-width />
                        {{ $t('home.banner.yeti') }}
                        <NuxtLink to="yeti">YETI</NuxtLink>
                      </li>
                      <li class="with-circle">
                        <i18n-t keypath="home.banner.library">
                          <template v-slot:articles>
                            <IconDocument type="article" />
                            <NuxtLink to="articles">{{ $t('articles') }}</NuxtLink>
                          </template>
                          <template v-slot:books>
                            <IconDocument type="book" />
                            <NuxtLink to="books">{{ $t('books') }}</NuxtLink>
                          </template>
                        </i18n-t>
                      </li>
                      <li>
                        <IconForum />
                        <NuxtLink to="forum">
                          {{ $t('home.banner.forum') }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="column is-12-mobile">
                  <i18n-t keypath="home.banner.camptocamp" tag="p">
                    <NuxtLink to="/articles/106726">
                      {{ $t('camptocamp-association') }}
                    </NuxtLink>
                  </i18n-t>
                  <NuxtLink to="/articles/106726" class="menu-brand has-text-centered">
                    <img src="@/assets/img/logo_asso.svg" alt="Camptocamp Association" class="logo-association" />
                  </NuxtLink>
                  <ul>
                    <li>
                      <a href="https://www.helloasso.com/associations/camptocamp-association">
                        {{ $t('home.banner.join') }}
                      </a>
                    </li>
                    <li>
                      <Icon icon="heart" class="donate-icon" />
                      <a href="https://www.helloasso.com/associations/camptocamp-association">
                        {{ $t('home.banner.donate') }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </Box>
</template>

<script setup lang="ts">
const config = useCookie('home.config', {
  default: () => ({ feed: true, banner: true, personal: false }),
});
const panelValue = ref(config.value.banner ? 'intro' : null);
watch(panelValue, () => {
  config.value.banner = panelValue.value === 'intro';
});
</script>

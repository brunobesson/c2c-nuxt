<template>
  <!-- TODO styling -->
  <Box>
    <Accordion v-model:value="panelValue">
      <AccordionPanel value="intro" class="!border-none">
        <AccordionHeader class="!text-xl">{{ $t('home.intro') }}</AccordionHeader>
        <AccordionContent>
          <div class="text-lg">
            {{ $t('home.banner.title') }}
          </div>
          <div class="mobile:grid mobile:grid-cols-2 mobile:gap-4">
            <div>
              <div>
                <p>{{ $t('home.banner.available') }}</p>
                <ul>
                  <li>
                    <IconDocument type="route" fixed-width />&nbsp;<NuxtLink to="routes" class="link">{{
                      $t('home.banner.routes')
                    }}</NuxtLink>
                  </li>
                  <li>
                    <IconDocument type="outing" fixed-width />&nbsp;<NuxtLink to="outings" class="link">
                      {{ $t('home.banner.outings') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <IconDocument type="xreport" fixed-width />
                    {{ $t('home.banner.xreports') }}
                    <NuxtLink to="serac" class="link">SERAC</NuxtLink>
                  </li>
                  <li>
                    <IconYeti fixed-width />
                    {{ $t('home.banner.yeti') }}
                    <NuxtLink to="yeti" class="link">YETI</NuxtLink>
                  </li>
                  <li class="list-disc ml-6">
                    <i18n-t keypath="home.banner.library">
                      <template v-slot:articles>
                        <IconDocument type="article" />&nbsp;<NuxtLink to="articles" class="link">{{
                          $t('articles')
                        }}</NuxtLink>
                      </template>
                      <template v-slot:books>
                        <IconDocument type="book" />&nbsp;<NuxtLink to="books" class="link">{{ $t('books') }}</NuxtLink>
                      </template>
                    </i18n-t>
                  </li>
                  <li>
                    <IconForum />&nbsp;<NuxtLink to="forum" class="link">
                      {{ $t('home.banner.forum') }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <i18n-t keypath="home.banner.camptocamp" tag="p">
                <NuxtLink to="/articles/106726" class="link">
                  {{ $t('camptocamp-association') }}
                </NuxtLink>
              </i18n-t>
              <NuxtLink to="/articles/106726" class="menu-brand has-text-centered">
                <img src="@/assets/img/logo_asso.svg" alt="Camptocamp Association" class="max-w-[35%] mx-auto" />
              </NuxtLink>
              <ul>
                <li>
                  <a href="https://www.helloasso.com/associations/camptocamp-association" class="link">
                    {{ $t('home.banner.join') }}
                  </a>
                </li>
                <li>
                  <Icon icon="heart" class="donate-icon" />&nbsp;
                  <a href="https://www.helloasso.com/associations/camptocamp-association" class="link">
                    {{ $t('home.banner.donate') }}
                  </a>
                </li>
              </ul>
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

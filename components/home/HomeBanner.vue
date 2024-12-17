<template>
  <section>
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
  </section>
</template>

<style scoped lang="scss">
.intro-banner {
  padding-bottom: 40px;
  padding-top: 70px;
  color: #fff;
  width: 80%;
  min-width: 730px;
  height: 100%;
  margin: auto;
  align-items: center;
}

.title.is-4 {
  margin-top: 25px;
}

.with-circle {
  list-style: disc !important;
  margin-left: var(--bulma-size-3);
}

@include mixins.mobile {
  .intro-banner {
    width: 100%;
    min-width: auto;
    padding: 20px;
  }

  .title.is-4 {
    margin-top: 0;
  }
}

.logo-association {
  max-width: 35%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

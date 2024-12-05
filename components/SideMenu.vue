<template>
  <aside>
    <NuxtLink to="/" class="menu-brand has-text-centered">
      <img src="~/assets/img/logo.svg" />
    </NuxtLink>
    <NuxtLink to="/topoguide">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'NuxtLink-active': [
            'topoguide',
            'routes',
            'waypoints',
            'areas',
            'route',
            'waypoint',
            'area',
          ].includes(route.path),
        }"
      >
        <IconTopoguide fixed-width />
        <span class="menu-item-text is-capitalized">
          {{ $t('topoguide') }}
        </span>
      </span>
    </NuxtLink>

    <!-- TODO lien + is-active -->
    <NuxtLink to="/outings">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'NuxtLink-active': ['outings', 'outing'].includes(route.path),
        }"
      >
        <IconDocument type="outing" fixed-width />
        <span class="menu-item-text is-capitalized"> {{ $t('outings') }} </span>
      </span>
    </NuxtLink>

    <!-- TODO link -->
    <NuxtLink to="/forum" external>
      <span class="menu-item is-ellipsed">
        <IconForum />
        <span class="menu-item-text is-capitalized"> {{ $t('forum') }} </span>
      </span>
    </NuxtLink>

    <!-- TODO link -->
    <NuxtLink to="/serac">
      <span class="menu-item is-ellipsed">
        <IconDocument type="xreport" fixed-width />
        <span class="menu-item-text is-capitalized">
          {{ $t('accident database') }}
        </span>
      </span>
    </NuxtLink>

    <!-- TODO lien + is-active -->
    <NuxtLink to="/articles">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'NuxtLink-active': ['articles', 'article'].includes(route.path),
        }"
      >
        <IconDocument type="article" fixed-width />
        <span class="menu-item-text is-capitalized">
          {{ $t('articles') }}
        </span>
      </span>
    </NuxtLink>

    <!-- TODO lien + is-active -->
    <NuxtLink to="/yeti">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'NuxtLink-active': ['yeti'].includes(route.path),
        }"
      >
        <IconYeti fixed-width />
        <span class="menu-item-text is-capitalized"> {{ $t('YETI') }} </span>
      </span>
    </NuxtLink>

    <ul>
      <li v-for="locale in availableLocales" :key="locale.code">
        <a href="#" @click.prevent.stop="setLocale(locale.code)">
          {{ locale.code }}
        </a>
      </li>
    </ul>

    <div class="menu-footer is-size-7">
      <Advertisement class="menu-add" v-if="hasHeightForAd" />
      <div class="has-text-centered menu-links">
        <NuxtLink to="/article/106727">{{ $t('contact') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/article/106731">{{ $t('EULA') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/article/106728">{{ $t('licenses') }}</NuxtLink>
        <br />
        <NuxtLink to="/article/106726">{{ $t('association') }}</NuxtLink>
        <span> &bull; </span>
        <a @click="showGdpr">{{ $t('cookies') }}</a>
      </div>

      <div class="columns is-gapless has-text-centered is-mobile menu-socials">
        <div class="column">
          <NuxtLink
            external
            href="https://www.instagram.com/camptocamp_org/"
            title="Instagram"
          >
            <IconInstagram class="instagram-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink
            external
            href="https://www.facebook.com/camptocamp.org/"
            title="Facebook"
          >
            <FaIcon :icon="['fab', 'facebook']" class="facebook-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink
            external
            href="https://www.youtube.com/channel/UCllJ4-Ab7A0ZoqlAOAJtnCw"
            title="Youtube"
          >
            <FaIcon :icon="['fab', 'youtube']" class="youtube-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink
            external
            href="https://www.helloasso.com/associations/camptocamp-association"
            :title="$t('donate')"
          >
            <FaIcon icon="heart" class="donate-icon" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute();
const { hasHeightForAd } = import.meta.client
  ? useScreen()
  : { hasHeightForAd: ref(false) };

const showGdpr = () => {
  // TODO
};

const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() =>
  locales.value.filter((l) => l.code !== locale.value)
);
</script>

<style lang="scss" scoped>
$brandLogoHeight: 70px;
$brandLogoMargin: 5px;

$menuLinkHeightPadding: 6px;

aside {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2); // TODO
  background: var(--bulma-white);
}

.menu-brand {
  display: block;
  line-height: 0;

  img {
    height: $brandLogoHeight;
    margin: $brandLogoMargin 0;
  }
}

.menu-item {
  display: block;
  padding: $menuLinkHeightPadding 10px;
  border-left: 5px solid var(--bulma-white);
  color: $color-text;

  &:hover {
    background: var(--bulma-background);
    border-left: 5px solid $color-base-c2c-lighter;
  }

  &-text {
    margin-left: 0;
    font-size: 1.1rem;
  }

  &.NuxtLink-active {
    border-left: 5px solid $color-base-c2c;
    font-weight: bold;
  }
}

.menu-footer {
  position: absolute;
  width: 100%;
  bottom: 0;

  .menu-socials,
  .menu-ad,
  .menu-links {
    margin-bottom: 15px !important;
    line-height: 1;
  }

  .menu-ad {
    height: 320px;
    margin-left: calc((200px - 160px) / 2);
    margin-right: calc((200px - 160px) / 2);
  }

  .instagram-icon,
  .facebook-icon,
  .donate-icon,
  .youtube-icon {
    font-size: 30px;
  }

  .facebook-icon {
    color: #6d8bc9; //facebook color
  }

  .youtube-icon {
    color: #f00; // youtube color
  }

  .donate-icon {
    color: hsl(348, 100%, 71%);
    &:hover {
      color: hsl(348, 100%, 51%);
    }
  }
}

@media screen and (max-height: 680px) {
  .menu-socials {
    display: none !important;
  }
}
</style>

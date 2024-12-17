<template>
  <aside>
    <NuxtLink to="/" class="menu-brand has-text-centered">
      <img src="~/assets/img/logo.svg" />
    </NuxtLink>
    <NuxtLink to="/topoguide">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'router-link-active': ['topoguide', 'routes', 'waypoints', 'areas', 'route', 'waypoint', 'area'].some(p =>
            route.path.startsWith(`/${p}`),
          ),
        }">
        <IconTopoguide fixed-width />&nbsp;
        <span class="menu-item-text is-capitalized">
          {{ $t('guidebook') }}
        </span>
      </span>
    </NuxtLink>

    <NuxtLink to="/outings">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'router-link-active': route.path.startsWith('/outings'),
        }">
        <IconDocument type="outing" fixed-width />&nbsp;
        <span class="menu-item-text is-capitalized"> {{ $t('outings') }} </span>
      </span>
    </NuxtLink>

    <NuxtLink to="/forum">
      <span class="menu-item is-ellipsed">
        <IconForum />&nbsp;
        <span class="menu-item-text is-capitalized"> {{ $t('forum') }} </span>
      </span>
    </NuxtLink>

    <NuxtLink to="/serac">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'router-link-active': ['serac', 'xreports'].some(p => route.path.startsWith(`/${p}`)),
        }">
        <IconDocument type="xreport" fixed-width />&nbsp;
        <span class="menu-item-text">
          {{ $t('side-menu.serac') }}
        </span>
      </span>
    </NuxtLink>

    <NuxtLink to="/articles">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'router-link-active': route.path.startsWith('/articles'),
        }">
        <IconDocument type="article" fixed-width />&nbsp;
        <span class="menu-item-text is-capitalized">
          {{ $t('articles') }}
        </span>
      </span>
    </NuxtLink>

    <NuxtLink to="/yeti">
      <span
        class="menu-item is-ellipsed"
        :class="{
          'router-link-active': route.path.startsWith('/yeti'),
        }">
        <IconYeti fixed-width />&nbsp;
        <span class="menu-item-text is-capitalized">YETI</span>
      </span>
    </NuxtLink>

    <div class="menu-footer is-size-7">
      <AdFallback class="menu-add" v-if="hasHeightForAd" />
      <div class="has-text-centered menu-links">
        <NuxtLink to="/articles/106727">{{ $t('side-menu.contact') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/articles/106731">{{ $t('side-menu.EULA') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/articles/106728">{{ $t('side-menu.licenses') }}</NuxtLink>
        <br />
        <NuxtLink to="/articles/106726">{{ $t('camptocamp-association') }}</NuxtLink>
        <span> &bull; </span>
        <a @click="showGdpr">{{ $t('side-menu.cookies') }}</a>
      </div>

      <div class="columns is-gapless has-text-centered is-mobile menu-socials">
        <div class="column">
          <NuxtLink href="https://www.instagram.com/camptocamp_org/" title="Instagram">
            <IconInstagram class="instagram-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink href="https://www.facebook.com/camptocamp.org/" title="Facebook">
            <Icon :icon="['fab', 'facebook']" class="facebook-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink href="https://www.youtube.com/channel/UCllJ4-Ab7A0ZoqlAOAJtnCw" title="Youtube">
            <Icon :icon="['fab', 'youtube']" class="youtube-icon" />
          </NuxtLink>
        </div>
        <div class="column">
          <NuxtLink href="https://www.helloasso.com/associations/camptocamp-association" :title="$t('donate')">
            <Icon icon="heart" class="donate-icon" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useGdprStore } from '../store/gdpr.js';

const route = useRoute();
const { hasHeightForAd } = import.meta.client ? useScreen() : { hasHeightForAd: ref(false) };

const showGdpr = () => {
  const { openGdprDialog } = useGdprStore();
  openGdprDialog();
};
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

  &.router-link-active {
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

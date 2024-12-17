<template>
  <nav
    class="is-size-5"
    :class="{
      'with-ad': isHomePage && !isMobile && !isTablet && !isDesktop,
    }">
    <span
      v-if="isMobile || isTablet"
      class="navigation-item"
      :class="{ 'is-hidden-mobile': !hideSearchInput }"
      @click="$emit('toggle-side-menu')">
      <span class="button">
        <Icon icon="bars" />
      </span>
    </span>

    <NuxtLink
      v-if="isMobile || isTablet"
      to="/"
      class="navigation-item navigation-brand has-text-centered"
      :class="{ 'is-hidden-mobile': !hideSearchInput }">
      <img src="~/assets/img/logo.svg" alt="Camptocamp.org" />
    </NuxtLink>

    <AdDfmLarge v-if="!isHomePage && !isMobile && !isTablet && !isDesktop" />

    <div class="navigation-end">
      <button v-if="!authenticated" class="button" @click="login">Login</button>
      <button v-else class="button" @click="logout">Logout</button>
      <NuxtLink
        to="/articles/106732"
        class="navigation-item has-text-centered"
        :class="{ 'is-hidden-mobile': !hideSearchInput }">
        <IconHelp fixed-width />
        <span class="is-hidden-mobile is-capitalized">
          {{ $t('help') }}
        </span>
      </NuxtLink>
      <!-- TODO -->
      <div class="navigation-item search-input">Search input</div>
      <div class="navigation-item">
        <LinkJoinUs class="has-text-centered button" :class="{ 'is-hidden-mobile': !hideSearchInput }">
          <IconJoinUs fixed-width />
          <span class="is-hidden-mobile is-capitalized">{{ $t('navigation.join') }}</span>
        </LinkJoinUs>

        <div class="navigation-item">
          <DropdownButton class="is-right add-button">
            <template #trigger>
              <button class="button is-success">
                <Icon icon="plus" />
              </button>
            </template>
            <LinkAdd
              v-for="documentType of ['outing', 'route', 'waypoint', 'article', 'book', 'xreport']"
              :key="documentType"
              :document-type="documentType"
              class="dropdown-item is-size-5 is-ellipsed">
              <IconDocument :type="documentType" fixed-width />
              <span>TODO</span>
            </LinkAdd>
          </DropdownButton>
        </div>
      </div>

      <div v-if="!authenticated" class="navigation-item">
        <ButtonLogin class="is-link">
          <span class="is-hidden-touch">{{ $t('login') }}</span>
          &nbsp;
          <Icon icon="sign-in-alt" />
        </ButtonLogin>
      </div>

      <div v-else class="navigation-item">
        <DropdownButton class="is-right" ref="userMenu">
          <template #trigger>
            <span class="button">
              <NuxtImg
                width="24"
                height="24"
                alt="Avatar"
                :src="
                  `https://forum.camptocamp.org` + // TODO
                  '/user_avatar/forum.camptocamp.org/' +
                  user?.forumUsername +
                  '/24/1_1.png'
                " />
              <span class="has-text-weight-bold is-hidden-mobile"> &nbsp;{{ user?.name }} </span>
            </span>
          </template>

          <NuxtLink
            v-for="item of userMenuLinks"
            :key="item.text"
            :to="item.to"
            class="dropdown-item is-size-5"
            @click.native="userMenu!.isActive = false">
            <Icon v-if="item.icon" :icon="item.icon" fixed-width />
            <IconDocument v-else :type="item.documentType!" fixed-width />
            {{ item.text }}
          </NuxtLink>

          <hr class="dropdown-divider" />

          <a class="dropdown-item is-size-5" @click="logout()">
            <Icon icon="sign-out-alt" fixed-width />
            {{ $t('logout') }}
          </a>
        </DropdownButton>
      </div>

      <div v-if="!authenticated" class="navigation-item">
        <DropdownButton class="is-right">
          <template #trigger>
            <button class="button">
              {{ locale }}
            </button>
          </template>
          <a
            v-for="lang in locales"
            :key="lang.code"
            class="dropdown-item is-size-5"
            :class="{ 'is-active': lang.code === locale }"
            @click="setLocale(lang.code)">
            {{ lang.name }}
          </a>
        </DropdownButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';
import type DropdownButton from './DropdownButton.vue';

const { isHomePage } = useHomePage();
const { isMobile, isTablet, isDesktop } = import.meta.client
  ? useScreen()
  : { isMobile: ref(false), isTablet: ref(false), isDesktop: ref(false) };

const hideSearchInput = ref(true); // only on small screen

const { authenticate, logout: logoutUser } = useAuthStore();
const { authenticated, user } = storeToRefs(useAuthStore());

const login = async () => {
  authenticate({ username: 'emilys', password: 'emilyspass' }); // TODO check error too
};

const logout = () => {
  logoutUser();
  const route = useRoute();
  const middleware = route.meta.middleware;
  if (
    (typeof middleware === 'string' && middleware === 'auth-guard') ||
    (Array.isArray(middleware) && middleware.includes('auth-guard'))
  ) {
    navigateTo('/');
  }
};
const { t, locale, locales, setLocale } = useI18n();
const userMenuLinks = computed(() =>
  user.value
    ? [
        {
          to: { path: '/profile', params: { id: user.value.id.toString() } },
          text: t('navigation.my-profile'),
          icon: 'user',
        },
        {
          to: { path: '/account' },
          text: t('navigation.account'),
          icon: 'check-circle',
        },
        {
          to: { path: '/preferences' },
          text: t('navigation.preferences'),
          icon: 'gears',
        },
        {
          to: { path: '/trackers' },
          text: t('navigation.activity-trackers'),
          icon: 'location-crosshairs',
        },
        {
          to: { path: '/outings', query: { u: user.value.id.toString() } },
          text: t('navigation.my-outings'),
          documentType: 'outing',
        },
        {
          to: {
            path: '/outings-stats',
            query: { u: user.value.id.toString() },
          },
          text: t('navigation.my-statistics'),
          icon: 'chart-bar',
        },
        {
          to: { path: '/whatsnew', query: { u: user.value.id.toString() } },
          text: t('navigation.my-changes'),
          icon: 'edit',
        },
        {
          to: { path: '/following' },
          text: t('navigation.followed-users'),
          icon: 'heart',
        },
        {
          to: { path: '/routes', query: { u: user.value.id.toString() } },
          text: t('navigation.bookmarks'),
          icon: 'star',
        },
      ]
    : [],
);

const userMenu = useTemplateRef<InstanceType<typeof DropdownButton>>('userMenu');
</script>

<style lang="scss">
nav {
  max-width: 100vw;
  height: $navbar-height;
  background-color: var(--bulma-white);
  box-shadow: 0 2px 0 $color-base-c2c;
  display: flex;
}

.navigation-brand {
  padding: 4px 5px !important;
  img {
    height: calc(#{$navbar-height} - 8px);
  }
}

.navigation-end {
  justify-content: flex-end;
  margin-left: auto;
  display: flex;
}

.navigation-item {
  display: flex;
  align-items: center;
  line-height: 1.5;
}

@include mixins.mobile {
  .add-button .dropdown-content {
    position: fixed;
    right: 0;
    max-width: 100%;
  }
}
</style>

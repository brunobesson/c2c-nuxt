<template>
  <nav
    class="max-w-screen h-[--navbar-height] flex bg-white shadow-nav"
    :class="{ 'with-ad': !isHomePage && (isWidescreen || isFullHD) }">
    <!-- TODO ad-->
    <span
      v-if="isMobile || isTablet"
      class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3"
      :class="{ 'max-mobile:hidden': !hideSearchInput }"
      @click="$emit('toggleSideMenu')">
      <Button>
        <Icon icon="bars" />
      </Button>
    </span>
    <NuxtLink
      v-if="isMobile || isTablet"
      to="/"
      class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3 text-center"
      :class="{ 'max-mobile:hidden': !hideSearchInput }">
      <img
        src="~/assets/img/logo.svg"
        alt="Camptocamp.org"
        class="ml-0 tablet:ml-[5px] h-[calc(var(--navbar-height)_-_8px)]" />
    </NuxtLink>

    <AdDfmLarge v-if="!isHomePage && !isMobile && !isTablet && !isDesktop" />
    <div class="flex justify-end items-center ml-auto mr-[5px] desktop:mr-4">
      <NuxtLink
        to="/articles/106732"
        class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3 text-center"
        :class="{ 'max-mobile:hidden': !hideSearchInput }">
        <IconHelp fixed-width />
        <span class="max-mobile:hidden capitalize">
          {{ $t('help') }}
        </span>
      </NuxtLink>
      <div ref="searchInputContainer">
        <!-- TODO -->
        <InputText
          :placeholder="$t('navigation.search')"
          :class="{ 'max-mobile:hidden': hideSearchInput }"
          class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3 w-[160px] widescreen:w-[250px] widescreen:mr-[50px] widescreen:hover:w-[300px] widescreen:hover:mr-0 widescreen:transition-[width,margin-right] widescreen:duration-500" />
      </div>

      <div class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3">
        <LinkJoinUs :class="{ 'max-mobile:hidden': !hideSearchInput }" />
      </div>

      <div class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3">
        <DropdownButton :items="addMenuItems">
          <template #trigger>
            <Icon icon="plus" />
          </template>
          <template #item="{ item }">
            <LinkAdd :document-type="item.documentType" class="text-ellipsis">
              <IconDocument :type="item.documentType" fixed-width />
              <span>TODO</span>
            </LinkAdd>
          </template>
        </DropdownButton>
      </div>

      <div v-if="!authenticated" class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3">
        <ButtonLogin>
          <span class="max-tablet:hidden">{{ $t('login') }}</span> <Icon icon="sign-in-alt" />
        </ButtonLogin>
      </div>

      <div v-else class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3">
        <DropdownButton :items="userMenuItems">
          <template #trigger>
            <!-- display: inline -->
            <NuxtImg
              width="24"
              height="24"
              :src="`${config.public.forumBase}/user_avatar/forum.camptocamp.org/${user?.forumUsername}/24/1_1.png`" />&nbsp;<span
              class="font-bold max-mobile:hidden">
              {{ user?.name }}
            </span>
          </template>
          <template #item="{ item }">
            <a v-if="item.logout" @click="logout()">
              <Icon icon="sign-out-alt" fixed-width />
              {{ $t('logout') }}
            </a>
            <NuxtLink v-else :to="item.to">
              <Icon v-if="item.icon" :icon="item.icon" fixed-width />
              <IconDocument v-else :type="item.documentType!" fixed-width />
              {{ item.text }}
            </NuxtLink>
          </template>
        </DropdownButton>
      </div>

      <div v-if="!authenticated" class="flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3">
        <DropdownButton :items="locales">
          <template #trigger>
            {{ locale }}
          </template>
          <template #item="{ item }" class="toto">
            <a
              :key="item.code"
              class="w-full block"
              :class="{ 'bg-[--p-menu-item-focus-background]': item.code === locale }"
              @click="configureLocale(item.code)">
              {{ item.name }}
            </a>
          </template>
        </DropdownButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import { useAuthStore } from '~/store/auth.js';

const config = useRuntimeConfig();
const { isHomePage } = useHomePage();
const { isMobile, isTablet, isDesktop, isWidescreen, isFullHD } = import.meta.client
  ? useScreen()
  : { isMobile: ref(false), isTablet: ref(false), isDesktop: ref(false) };

const hideSearchInput = ref(true); // only on small screen

// TODO types Activity
const addMenuItems: { documentType: string }[] = [
  { documentType: 'outing' },
  { documentType: 'route' },
  { documentType: 'waypoint' },
  { documentType: 'article' },
  { documentType: 'book' },
  { documentType: 'xreport' },
];

const { logout: logoutUser } = useAuthStore();
const { authenticated, user } = storeToRefs(useAuthStore());

function logout() {
  logoutUser();
  const route = useRoute();
  const middleware = route.meta.middleware;
  if (
    (typeof middleware === 'string' && middleware === 'auth-guard') ||
    (Array.isArray(middleware) && middleware.includes('auth-guard'))
  ) {
    navigateTo('/');
  }
}
const { t, locale, locales, setLocale } = useI18n();
const { isUiLang } = useLang();

function configureLocale(lang: string) {
  if (!isUiLang(lang)) {
    return; // should not happen
  }
  setLocale(lang);
  if (authenticated) {
    useNuxtApp().$c2cFetch('/users/update_preferred_language', { method: 'POST', body: { lang } });
  }
}

const userMenuItems = computed((): MenuItem[] =>
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
        { separator: true },
        {
          logout: true,
        },
      ]
    : [],
);
</script>

<!-- <style lang="scss">
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

.flex items-center leading-6 py-2 px-0.5 tablet:px-1 desktop:px3 {
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
</style> -->

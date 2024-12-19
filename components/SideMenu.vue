<template>
  <!-- TODO replace with drawer? -->
  <aside class="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.2)]">
    <NuxtLink to="/" class="block text-center">
      <img src="~/assets/img/logo.svg" class="h-[70px] my-[5px]" />
    </NuxtLink>
    <NuxtLink to="/topoguide">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green"
        :class="{
          'router-link-active': ['topoguide', 'routes', 'waypoints', 'areas', 'route', 'waypoint', 'area'].some(p =>
            route.path.startsWith(`/${p}`),
          ),
        }">
        <IconTopoguide fixed-width /> <span class="ml-0 capitalize">{{ $t('guidebook') }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/outings">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green"
        :class="{
          'router-link-active': route.path.startsWith('/outings'),
        }">
        <IconDocument type="outing" fixed-width /> <span class="ml-0 capitalize">{{ $t('outings') }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/forum">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green">
        <IconForum /> <span class="ml-0 capitalize">{{ $t('forum') }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/serac">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green"
        :class="{
          'router-link-active': ['serac', 'xreports'].some(p => route.path.startsWith(`/${p}`)),
        }">
        <IconDocument type="xreport" fixed-width /> <span class="menu-item-text">{{ $t('side-menu.serac') }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/articles">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green"
        :class="{
          'router-link-active': route.path.startsWith('/articles'),
        }">
        <IconDocument type="article" fixed-width /> <span class="ml-0 capitalize">{{ $t('articles') }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/yeti">
      <span
        class="block py-[6px] px-[10px] border-l-[5px] border-solid border-white text-sky-800 hover:bg-green-600 hover:text-green"
        :class="{
          'router-link-active': route.path.startsWith('/yeti'),
        }"
        >&nbsp;<IconYeti fixed-width /> <span class="ml-0 capitalize">YETI</span>
      </span>
    </NuxtLink>

    <div class="absolute w-full bottom-0 text-xs">
      <AdFallback class="h-[320p] mx-[20px] mb-[15px]" v-if="hasHeightForAd" />
      <div class="text-center mb-[15px]">
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

      <div class="flex justify-evenly mb-[15px] text-center">
        <div>
          <NuxtLink href="https://www.instagram.com/camptocamp_org/" title="Instagram">
            <IconInstagram class="text-[30px]" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink href="https://www.facebook.com/camptocamp.org/" title="Facebook">
            <Icon :icon="['fab', 'facebook']" class="text-[30px] text-[#6d8bc9]" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink href="https://www.youtube.com/channel/UCllJ4-Ab7A0ZoqlAOAJtnCw" title="Youtube">
            <Icon :icon="['fab', 'youtube']" class="text-[30px] text-[#f00]" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink href="https://www.helloasso.com/associations/camptocamp-association" :title="$t('donate')">
            <Icon icon="heart" class="text-[30px] text-[hsl(348,100%,71%)] hover:text-[hsl(348,100%,51%)]" />
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

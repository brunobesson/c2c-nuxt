<template>
  <aside class="bg-white shadow-card">
    <NuxtLink to="/" class="grid place-content-center">
      <img src="~/assets/img/logo.svg" class="h-[70px] my-[5px]" />
    </NuxtLink>
    <NuxtLink to="/topoguide">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300"
        :class="{
          '!border-primary font-bold': ['topoguide', 'routes', 'waypoints', 'areas', 'route', 'waypoint', 'area'].some(
            p => route.path.startsWith(`/${p}`),
          ),
        }">
        <IconTopoguide fixed-width /> <span class="ml-0">{{ capitalize($t('guidebook')) }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/outings">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300"
        :class="{
          '!border-primary font-bold': route.path.startsWith('/outings'),
        }">
        <IconDocument type="outing" fixed-width /> <span class="ml-0">{{ capitalize($t('outings')) }}</span>
      </span>
    </NuxtLink>

    <a :href="forumUrl">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300">
        <IconForum /> <span class="ml-0">{{ capitalize($t('forum')) }}</span>
      </span>
    </a>

    <NuxtLink to="/serac">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300"
        :class="{
          '!border-primary font-bold': ['serac', 'xreports'].some(p => route.path.startsWith(`/${p}`)),
        }">
        <IconDocument type="xreport" fixed-width /> <span class="ml-0">{{ capitalize($t('side-menu.serac')) }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/articles">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300"
        :class="{
          '!border-primary font-bold': route.path.startsWith('/articles'),
        }">
        <IconDocument type="article" fixed-width /> <span class="ml-0">{{ capitalize($t('articles')) }}</span>
      </span>
    </NuxtLink>

    <NuxtLink to="/yeti">
      <span
        class="block py-[6px] px-[10px] text-lg border-l-[5px] border-solid border-transparent hover:bg-hover hover:border-primary-300"
        :class="{
          '!border-primary font-bold': route.path.startsWith('/yeti'),
        }"
        ><Icon :icon="['miscs', 'yeti']" fixed-width /> <span class="ml-0">YETI</span>
      </span>
    </NuxtLink>

    <div class="absolute w-full bottom-0 text-xs">
      <div class="text-center mb-[15px]">
        <NuxtLink to="/articles/106727" class="link">{{ $t('side-menu.contact') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/articles/106731" class="link">{{ $t('side-menu.EULA') }}</NuxtLink>
        <span> &bull; </span>
        <NuxtLink to="/articles/106728" class="link">{{ $t('side-menu.licenses') }}</NuxtLink>
        <br />
        <NuxtLink to="/articles/106726" class="link">{{ $t('camptocamp-association') }}</NuxtLink>
        <span> &bull; </span>
        <a @click="showGdpr" class="link">{{ $t('side-menu.cookies') }}</a>
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
          <NuxtLink
            href="https://www.helloasso.com/associations/camptocamp-association"
            :title="$t('side-menu.donate')">
            <Icon icon="heart" class="text-[30px] text-[hsl(348,100%,71%)] hover:text-[hsl(348,100%,51%)]" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useGdprStore } from '~/store/gdpr.js';

const route = useRoute();
const forumUrl = useRuntimeConfig().public.forumBase;
const showGdpr = () => {
  const { openGdprDialog } = useGdprStore();
  openGdprDialog();
};
</script>

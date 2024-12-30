<template>
  <Box>
    <template #title>
      <NuxtLink to="forum"><IconForum /> {{ $t('forum') }}</NuxtLink>
    </template>
    <div>
      <div v-if="status === 'pending'">
        <div class="skeleton" v-for="row in messageCount" :key="row">
          <button class="delete is-skeleton forum-row"></button>
          <div class="skeleton-lines">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div v-else-if="status === 'error'" class="notification is-danger">
        <!-- TODO -->
        {{ error?.message }}
      </div>
      <div v-else="topics">
        <ul>
          <li v-for="topic of topics" :key="topic.id">
            <!-- TODO ellipsis not working because  whitespace-nowrap overflow-hidden does no respect fractioning -->
            <NuxtLink
              class="flex gap-1 pb-1 w-full hover:bg-gray-100"
              :href="getTopicUrl(topic)"
              target="_blank"
              rel="noopener"
              :title="topic.last_poster_username">
              <NuxtImg
                :src="getAvatarUrl(topic.last_poster_avatar_template)"
                class="rounded-full align-top h-full shrink-0 w-[20px]"
                loading="lazy"
                alt="Avatar" />
              <span class="align-top whitespace-nowrap overflow-hidden text-ellipsis">
                {{ topic.title }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <template #more>
      <NuxtLink to="forum">
        {{ $t('more') }}
      </NuxtLink>
    </template>
  </Box>
</template>

<script setup lang="ts">
import type { AsyncDataOptions, UseFetchOptions } from '#app';
import { type Latest, type Topic } from '~/api/forum.js';

const config = useRuntimeConfig();

const EXCLUDED_CATEGORIES = [
  // https://forum.camptocamp.org/c/comments
  // document's comments
  29,

  // https://forum.camptocamp.org/c/petites-annonces
  // offers (petites annonces in french)
  40, // ski surf snowshoeing gears
  41, // ice, snow, mixt gears
  42, // climnbing gears
  43, // Misc gears
  44, // other offers
  45, // professionals

  // https://forum.camptocamp.org/c/apres-l-effort/partenaires
  // tinder for camptocamp ? ;)
  47,

  // https://forum.camptocamp.org/c/apres-l-effort/bistrot
  // all but subjects about mountain...
  54,

  // https://forum.camptocamp.org/c/archives/le-site-suggestions-bugs-et-problemes
  // Old V5 site's bugs reporting
  55,

  // https://forum.camptocamp.org/c/site-et-association/moderation-forums-topoguide-articles
  // Forum moderation
  56,

  // https://forum.camptocamp.org/c/site-et-association/traduction
  // traduction issues
  64,

  // https://forum.camptocamp.org/c/partenaires/partenaires-ski-surf-raquette-randonnee-trai
  // ski buddy finder
  94,

  // https://forum.camptocamp.org/c/partenaires/partenaires-escalade-sae
  // climbing buddy finder
  95,

  // https://forum.camptocamp.org/c/partenaires/co-voiturage
  // car-pooling
  96,

  // https://forum.camptocamp.org/c/petites-annonces/perdu-trouve
  // have you find/lost something in the moutain ? it's here!
  97,

  // https://forum.camptocamp.org/c/partenaires/partenaires-alpinisme-cascade-de-glace
  // mountaineering buddy finder
  113,

  // https://forum.camptocamp.org/c/site-et-association/v6-suggestions-bugs-et-problemes
  // Site's bugs reporting
  136,

  // https://forum.camptocamp.org/c/site-et-association/appli-mobile-suggestions-bugs
  // mobile application bugs reporting
  146,
];
const transform = (input: Latest) => {
  const userAvatars = new Map<string, string>();
  input.users.forEach(user => userAvatars.set(user.username, user.avatar_template));
  return input.topic_list.topics.map(
    topic =>
      ({
        ...topic,
        last_poster_avatar_template: userAvatars.get(topic.last_poster_username),
      } as AsyncDataOptions<Latest, Topic[]>),
  );
};
const { data, status, error } = useForumFetch(`/latest.json`, {
  query: { exclude_categoriy_id: EXCLUDED_CATEGORIES },
  transform,
  lazy: true,
  server: false,
} as UseFetchOptions<any>); // TODO

const { messageCount = -1 } = defineProps<{ messageCount?: number }>();

const topics = computed(() => {
  if (messageCount > 0 && data.value) {
    return data.value.slice(0, messageCount);
  }
  return data.value;
});

const getAvatarUrl = (avatarTemplate: string) => {
  const template = avatarTemplate.startsWith('/') ? config.public.forumBase + avatarTemplate : avatarTemplate;
  return template.replace('{size}', '20');
};

const getTopicUrl = (topic: Topic) => {
  return `${config.public.forumBase}/t/${topic.slug}/${topic.id}/${topic.highest_post_number}`;
};
</script>

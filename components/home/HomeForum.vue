<template>
  <div class="box">
    <h4 class="title is-3 is-capitalized">
      <NuxtLink to="forum">
        <IconForum />&nbsp;
        {{ $t('forum') }}
      </NuxtLink>
    </h4>
    <div :class="{ wide: wide }">
      <div v-if="status === 'pending'">
        <div class="skeleton" v-for="row in messageCount" :key="row">
          <button class="delete is-skeleton forum-row" :class="{ 'is-medium': wide }"></button>
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
        <NuxtLink
          class="forum-row"
          v-for="topic of topics"
          :key="topic.id"
          :href="getTopicUrl(topic)"
          target="_blank"
          rel="noopener"
          :title="topic.last_poster_username">
          <NuxtImg
            :src="getAvatarUrl(topic.last_poster_avatar_template)"
            :style="'width:' + imgSize + 'px'"
            loading="lazy"
            alt="Avatar" />
          <span :class="{ 'is-ellipsed': !wide }">
            {{ topic.title }}
          </span>
        </NuxtLink>
      </div>
    </div>
    <hr />
    <h6 class="title is-6 has-text-centered">
      <NuxtLink to="forum">
        {{ $t('more') }}
      </NuxtLink>
    </h6>
  </div>
</template>

<script setup lang="ts">
import { getAvatarUrl as getForumAvatarUrl, getLatest, type Topic } from '~/api/forum.js';

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
const { data, status, error } = getLatest(EXCLUDED_CATEGORIES, {
  lazy: true,
});

const { wide = false, messageCount = -1 } = defineProps<{
  wide?: boolean;
  messageCount?: number;
}>();

const topics = computed(() => {
  if (messageCount > 0 && data.value) {
    return data.value.slice(0, messageCount);
  }
  return data.value;
});

const imgSize = computed(() => (wide ? 24 : 20));

const getAvatarUrl = (avatarTemplate: string) => {
  return getForumAvatarUrl(avatarTemplate, imgSize.value);
};

const getTopicUrl = (topic: Topic) => {
  return `https://forum.camptocamp.org/t/${topic.slug}/${topic.id}/${topic.highest_post_number}`; // TODO configure baseurl
};
</script>

<style scoped lang="scss">
.forum-row {
  display: flex;
  color: $color-text;
  padding-bottom: 0.2rem;

  img {
    border-radius: 50%;
    vertical-align: top;
    height: 100%;
    flex-shrink: 0;
  }

  span {
    vertical-align: top;
  }
}

.forum-row:hover {
  background: var(--bulma-background);
}

.wide {
  .forum-row {
    padding: 1rem;
    border-bottom: 1px solid #eee;

    img {
      margin-right: 0.5rem;
    }
  }
}

:not(.wide) {
  span {
    padding-left: 0.5rem;
  }
}

h4 > a,
h6 > a {
  color: $color-text !important;
}

h4 > a:hover,
h6 > a:hover {
  color: $color-link !important;
}

.skeleton {
  display: flex;
  gap: 0.5rem;
  padding-bottom: 1rem;

  & > div {
    flex-grow: 1;
  }
}
</style>

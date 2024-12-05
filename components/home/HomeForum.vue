<template>
  <div class="box">
    <h4 class="title is-3">
      <NuxtLink to="forum">
        <IconForum />
        {{ $t('Forum') }}
      </NuxtLink>
    </h4>
    <div :class="{ wide: wide }">
      <div v-if="topics">
        <NuxtLink
          external
          class="forum-row"
          v-for="topic of topics"
          :key="topic.id"
          :href="getTopicUrl(topic)"
          target="_blank"
          rel="noopener"
          :title="topic.last_poster_username"
        >
          <!-- TODO NuxtImg? -->
          <img
            :src="getAvatarUrl(topic.last_poster_user)"
            :style="'width:' + imgSize + 'px'"
            loading="lazy"
            alt="Avatar"
          />
          <span :class="{ 'is-ellipsed': !wide }">
            {{ topic.title }}
          </span>
        </NuxtLink>
      </div>
    </div>
    <hr />
    <h6 class="title is-6 has-text-centered">
      <NuxtLink to="forum">
        {{ $t('See more') }}
      </NuxtLink>
    </h6>
  </div>
</template>

<script setup lang="ts">
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

const { wide = false, messageCount = -1 } = defineProps<{
  wide?: boolean;
  messageCount?: number;
}>();

const topics = computed(
  () =>
    [] as {
      id: string;
      title: string;
      last_poster_user: string;
      last_poster_username: string;
      highest_post_number: number;
      slug: string;
    }[]
); // TODO
const imgSize = computed(() => (wide ? 24 : 20));

const getAvatarUrl = (_user: string) => {
  return 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109'; // TODO forum.getAvatarUrl(user, imgSize);
};

const getTopicUrl = (topic: {
  id: string; // TODO
  title: string;
  last_poster_user: string;
  last_poster_username: string;
  highest_post_number: number;
  slug: string;
}) => {
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
</style>

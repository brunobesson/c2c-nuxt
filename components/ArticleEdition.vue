<template>
  <EditionContainer :document="document" :mode="mode">
    <!-- TODO -->
  </EditionContainer>
  <p>TODO Article edition</p>
</template>

<script setup lang="ts">
import type { Article, ArticleAddInitial, ArticleEdit } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

const { document: doc } = defineProps<{ document: Article | null; mode: 'edit' | 'add' }>();
const lang = useRouteParams<ApiLang>('lang', 'fr');

const document: Ref<ArticleEdit | ArticleAddInitial> = computed(() => {
  if (doc) {
    const { available_langs, version, protected: p, redirects_to, cooked, author, locales, ...rest } = doc;
    return {
      ...rest,
      'locale.lang': locales[0].lang,
      'locale.title': locales[0].title,
      'locale.summary': locales[0].summary,
      'locale.description': locales[0].description,
    };
  }

  return {
    type: 'c',
    quality: undefined,
    activities: [],
    categories: [],
    article_type: undefined,
    'locale.lang': lang.value,
    'locale.title': undefined,
    'locale.summary': undefined,
    'locale.description': undefined,
    associations: {
      // TODO
      articles: [],
      books: [],
      outings: [],
      routes: [],
      waypoints: [],
      images: [],
      users: [],
      xreports: [],
    },
    // TODO add associations from URL
  };
});
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <EditionContainer :document="document" :mode="mode">
      <!-- TODO -->
    </EditionContainer>
  </div>
</template>

<script setup lang="ts">
import { ArticleEdit, type Article, type ArticleAddInitial } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams<ApiLang>('lang', 'fr');
const route = useRoute();
const mode = (route.name as string).split('-')[1] as 'edit' | 'add';
const { data: document, status } = useAsyncData<ArticleEdit | ArticleAddInitial>(async () => {
  if (mode === 'edit') {
    const {
      available_langs,
      version,
      protected: p,
      redirects_to,
      cooked,
      author,
      locales,
      ...rest
    } = await useDocumentLoad<Article>().loadDocument(documentId, 'article', lang);
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

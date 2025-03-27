<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <EditionContainer v-else-if="document !== null" :document :schema>
      <FormInput field="locale_title" label="title" />
      <FormSelect field="article_type" :options="[...ARTICLE_TYPE_VALUES]" />
      <FormActivities field="activities" document-type="article" show-label />
      <FormMultiSelect
        field="categories"
        i18n-field="article_categories"
        :options="[...ARTICLE_CATEGORY_VALUES]"
        :label="capitalize($t('article_categories'))" />
      <FormQuality :document />
      <FormMarkdown field="locale_summary" label="summary" />
      <FormMarkdown field="locale_description" label="description" />
      <!-- TODO associations-->
    </EditionContainer>
  </div>
</template>

<script setup lang="ts">
import {
  ARTICLE_CATEGORY_VALUES,
  ARTICLE_TYPE_VALUES,
  ArticleFormAdd,
  ArticleFormEdit,
  type ArticleFormAddInitial,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams<ApiLang>('lang', 'fr');
const route = useRoute();
const router = useRouter();
const mode = (route.name as string).split('-')[1] as 'edit' | 'add';
const schema = mode === 'edit' ? ArticleFormEdit : ArticleFormAdd;
const { data: document, status } = useAsyncData(async () => {
  if (mode === 'edit') {
    const {
      available_langs,
      version,
      protected: p,
      redirects_to,
      cooked,
      author,
      locales,
      associations,
      ...rest
    } = await useDocumentLoad().loadDocument(documentId, 'article', lang);
    const article: ArticleFormEdit = {
      ...rest,
      locale_lang: locales[0].lang,
      locale_title: locales[0].title,
      locale_summary: locales[0].summary,
      locale_description: locales[0].description,
      associations_articles: associations['articles'],
      associations_books: associations['books'],
      associations_outings: associations['outings'],
      associations_routes: associations['routes'],
      associations_waypoints: associations['waypoints'],
      associations_images: associations['images'],
      associations_users: associations['users'],
      associations_xreports: associations['xreports'],
    };
    return article;
  }

  let article: ArticleFormAddInitial = {
    type: 'c',
    quality: undefined,
    activities: [],
    categories: [],
    article_type: undefined,
    locale_lang: lang.value,
    locale_title: undefined,
    locale_summary: undefined,
    locale_description: undefined,
    associations_articles: [],
    associations_books: [],
    associations_outings: [],
    associations_routes: [],
    associations_waypoints: [],
    associations_images: [],
    associations_users: [],
    associations_xreports: [],
  };

  for (const [k, docType] of [
    ['associations_articles', 'article'],
    ['associations_books', 'book'],
    ['associations_outings', 'outing'],
    ['associations_routes', 'route'],
    ['associations_waypoints', 'waypoint'],
    ['associations_images', 'image'],
    ['associations_users', 'profile'],
    ['associations_xreports', 'xreport'],
  ] as const) {
    const letter = documentLetter(docType);
    const ids = useRouteQuery(letter, '' as string, { route, router });
    article = await useAssociations().addAssociations(
      article,
      k,
      docType,
      ids.value.split(',').filter(Boolean).map(Number),
      lang.value,
    );
  }
  return article;
});
</script>

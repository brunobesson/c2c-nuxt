<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <EditionContainer v-else-if="document !== null" :document="document">
      <!-- TODO -->
      <p>toto</p>
    </EditionContainer>
  </div>
</template>

<script setup lang="ts">
import { ArticleFormEdit, type ArticleFormAddInitial } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams<ApiLang>('lang', 'fr');
const route = useRoute();
const router = useRouter();
const mode = (route.name as string).split('-')[1] as 'edit' | 'add';
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
      'locale.lang': locales[0].lang,
      'locale.title': locales[0].title,
      'locale.summary': locales[0].summary,
      'locale.description': locales[0].description,
      'associations.articles': associations['articles'],
      'associations.books': associations['books'],
      'associations.outings': associations['outings'],
      'associations.routes': associations['routes'],
      'associations.waypoints': associations['waypoints'],
      'associations.images': associations['images'],
      'associations.users': associations['users'],
      'associations.xreports': associations['xreports'],
    };
    return article;
  }

  let article: ArticleFormAddInitial = {
    type: 'c',
    quality: undefined,
    activities: [],
    categories: [],
    article_type: undefined,
    'locale.lang': lang.value,
    'locale.title': undefined,
    'locale.summary': undefined,
    'locale.description': undefined,
    'associations.articles': [],
    'associations.books': [],
    'associations.outings': [],
    'associations.routes': [],
    'associations.waypoints': [],
    'associations.images': [],
    'associations.users': [],
    'associations.xreports': [],
  };

  for (const [k, docType] of [
    ['associations.articles', 'article'],
    ['associations.books', 'book'],
    ['associations.outings', 'outing'],
    ['associations.routes', 'route'],
    ['associations.waypoints', 'waypoint'],
    ['associations.images', 'image'],
    ['associations.users', 'profile'],
    ['associations.xreports', 'xreport'],
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

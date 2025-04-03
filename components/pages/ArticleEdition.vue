<template>
  <div class="flex flex-col gap-5 p-5">
    <LoadDataError v-if="status === 'error'" />
    <EditionContainer v-else-if="document !== null" :document :schema :saveDocument :createDocument>
      <FormInput field="locales[0].title" label="title" />
      <FormSelect field="article_type" :options="[...ARTICLE_TYPE_VALUES]" />
      <FormActivities field="activities" document-type="article" show-label />
      <FormMultiSelect
        field="categories"
        i18n-field="article_categories"
        :options="[...ARTICLE_CATEGORY_VALUES]"
        :label="capitalize($t('article_categories'))" />
      <FormQuality :document />
      <FormMarkdown field="locales[0].summary" label="summary" />
      <FormMarkdown field="locales[0].description" label="description" />
      <FormAssociation field="associations.articles" documentType="article" />
      <FormAssociation field="associations.waypoints" documentType="waypoint" />
      <FormAssociation field="associations.outings" documentType="outing" />
      <FormAssociation field="associations.routes" documentType="route" />
      <FormAssociation field="associations.books" documentType="book" />
    </EditionContainer>
  </div>
</template>

<script setup lang="ts">
import {
  ARTICLE_CATEGORY_VALUES,
  ARTICLE_TYPE_VALUES,
  ArticleAdd,
  ArticleEdit,
  type ArticleAddInitial,
  type DocumentAdd,
  type DocumentEdit,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams<ApiLang>('lang', 'fr');
const route = useRoute();
const router = useRouter();
const mode = (route.name as string).split('-')[1] as 'edit' | 'add';
const schema = mode === 'edit' ? ArticleEdit : ArticleAdd;
const { data: document, status } = useAsyncData(async () => {
  if (mode === 'edit') {
    const {
      available_langs,
      protected: p,
      redirects_to,
      cooked,
      author,
      ...rest
    } = await useDocumentLoad().loadDocument(documentId, 'article', lang);
    const article: ArticleEdit = rest;
    return article;
  }

  let article: ArticleAddInitial = {
    type: 'c',
    quality: undefined,
    activities: [],
    categories: [],
    article_type: undefined,
    locales: [
      {
        lang: lang.value,
        title: undefined,
        summary: undefined,
        description: undefined,
      },
    ],
    associations: {
      articles: [],
      books: [],
      outings: [],
      routes: [],
      waypoints: [],
      images: [],
      users: [],
      xreports: [],
    },
  };

  for (const [k, docType] of [
    ['articles', 'article'],
    ['books', 'book'],
    ['outings', 'outing'],
    ['routes', 'route'],
    ['waypoints', 'waypoint'],
    ['images', 'image'],
    ['users', 'profile'],
    ['xreports', 'xreport'],
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

const createDocument = async (values: DocumentAdd) =>
  (await useC2cApi().article.create(values as ArticleAdd)).document_id;

const saveDocument = async (values: DocumentEdit, comment: string) => {
  await useC2cApi().article.save(values as ArticleEdit, comment);
  return values.document_id;
};
</script>

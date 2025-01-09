import type {
  Area,
  Article,
  Book,
  Document,
  Documents,
  Image,
  Map,
  Outing,
  Profile,
  Query,
  Route,
  UserPreferences,
  Waypoint,
  Xreport,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

export const useC2cApi = () => {
  const $fetch = useNuxtApp().$c2cFetch;
  const baseUrl = useRuntimeConfig().public.c2cApiBase;

  const getAll =
    <T extends Document>(type: string) =>
    async (query: Query): Promise<T[]> => {
      const data = await $fetch<Documents<T>>(`/${type}s`, { query });
      return data.documents;
    };
  const get =
    <T extends Document>(type: string) =>
    async (id: number, lang: ApiLang) =>
      $fetch<T>(`/${type}s/${id}`);
  const save =
    <T extends Document>(type: string) =>
    async (document: T, comment: string) =>
      $fetch<T>(`/${type}s/${document.document_id}`, { method: 'PUT', body: { document, message: comment } });
  const create =
    <T extends Document>(type: string) =>
    async (document: T) =>
      $fetch<T>(`/${type}s`, { method: 'POST', body: document });

  return {
    userProfile: {
      getPreferences: async () => $fetch<UserPreferences>('/user/preferences'),
    },

    area: {
      getAll: getAll<Area>('area'),
      get: get<Area>('area'),
      save: save<Area>('area'),
      create: create<Area>('area'),
    },
    article: {
      getAll: getAll<Article>('article'),
      get: get<Article>('article'),
      save: save<Article>('article'),
      create: create<Article>('article'),
    },
    book: {
      getAll: getAll<Book>('book'),
      get: get<Book>('book'),
      save: save<Book>('book'),
      create: create<Book>('book'),
    },
    image: {
      getAll: getAll<Image>('image'),
      get: get<Image>('image'),
      save: save<Image>('image'),
      create: create<Image>('image'),
    },
    map: { getAll: getAll<Map>('map'), get: get<Map>('map'), save: save<Map>('map'), create: create<Map>('map') },
    outing: {
      getAll: getAll<Outing>('outing'),
      get: get<Outing>('outing'),
      save: save<Outing>('outing'),
      create: create<Outing>('outing'),
    },
    profile: {
      getAll: getAll<Profile>('profile'),
      get: get<Profile>('profile'),
      save: save<Profile>('profile'),
      create: create<Profile>('profile'),
    },
    route: {
      getAll: getAll<Route>('route'),
      get: get<Route>('route'),
      save: save<Route>('route'),
      create: create<Route>('route'),
    },
    waypoint: {
      getAll: getAll<Waypoint>('waypoint'),
      get: get<Waypoint>('waypoint'),
      save: save<Waypoint>('waypoint'),
      create: create<Waypoint>('waypoint'),
    },
    xreport: {
      getAll: getAll<Xreport>('xreport'),
      get: get<Xreport>('xreport'),
      save: save<Xreport>('xreport'),
      create: create<Xreport>('xreport'),
    },
    baseUrl,
  };
};

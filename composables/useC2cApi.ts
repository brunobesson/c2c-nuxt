import type {
  Area,
  AreaListing,
  Article,
  ArticleListing,
  BaseDocument,
  Book,
  BookListing,
  Document,
  Documents,
  Feed,
  Image,
  ImageListing,
  Map,
  MapListing,
  Outing,
  OutingListing,
  Profile,
  ProfileListing,
  Query,
  Route,
  RouteListing,
  UserPreferences,
  Waypoint,
  WaypointListing,
  Xreport,
  XreportListing,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

export type FeedQuery = {
  /** When set only the given locale will be included (if available). Otherwise all locales will be returned. */
  pl?: ApiLang;
  /** How many entries should be returned (default: 10). The maximum is 50. */
  limit?: number;
  /**
   * The pagination token. When requesting a feed, the response includes a `pagination_token`. This token is to be used
   * to request the next page.
   */
  token?: string | undefined;
};

export const useC2cApi = () => {
  const $fetch = useNuxtApp().$c2cFetch;
  const baseUrl = useRuntimeConfig().public.c2cApiBase;

  const getAll =
    <T extends BaseDocument>(type: string) =>
    async (query: Query): Promise<T[]> => {
      const data = await $fetch<Documents<T>>(`/${type}s`, { query });
      return data.documents;
    };
  const get =
    <T extends Document>(type: string) =>
    async (id: T['document_id'], lang: ApiLang) =>
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

    feed: {
      getDefaultFeed: async (query: FeedQuery) => $fetch<Feed>('/feed', { query }),
      getProfileFeed: async (user: Profile['document_id'], query: FeedQuery) =>
        $fetch<Feed>('/profile-feed', { query: { ...query, u: user } }),
      getPersonalFeed: async (query: FeedQuery) => $fetch<Feed>('/personal-feed', { query }),
    },

    area: {
      getAll: getAll<AreaListing>('area'),
      get: get<Area>('area'),
      save: save<Area>('area'),
      create: create<Area>('area'),
    },
    article: {
      getAll: getAll<ArticleListing>('article'),
      get: get<Article>('article'),
      save: save<Article>('article'),
      create: create<Article>('article'),
    },
    book: {
      getAll: getAll<BookListing>('book'),
      get: get<Book>('book'),
      save: save<Book>('book'),
      create: create<Book>('book'),
    },
    image: {
      getAll: getAll<ImageListing>('image'),
      get: get<Image>('image'),
      save: save<Image>('image'),
      create: create<Image>('image'),
    },
    map: {
      getAll: getAll<MapListing>('map'),
      get: get<Map>('map'),
      save: save<Map>('map'),
      create: create<Map>('map'),
    },
    outing: {
      getAll: getAll<OutingListing>('outing'),
      get: get<Outing>('outing'),
      save: save<Outing>('outing'),
      create: create<Outing>('outing'),
    },
    profile: {
      getAll: getAll<ProfileListing>('profile'),
      get: get<Profile>('profile'),
      save: save<Profile>('profile'),
      create: create<Profile>('profile'),
    },
    route: {
      getAll: getAll<RouteListing>('route'),
      get: get<Route>('route'),
      save: save<Route>('route'),
      create: create<Route>('route'),
    },
    waypoint: {
      getAll: getAll<WaypointListing>('waypoint'),
      get: get<Waypoint>('waypoint'),
      save: save<Waypoint>('waypoint'),
      create: create<Waypoint>('waypoint'),
    },
    xreport: {
      getAll: getAll<XreportListing>('xreport'),
      get: get<Xreport>('xreport'),
      save: save<Xreport>('xreport'),
      create: create<Xreport>('xreport'),
    },
    baseUrl,
  };
};

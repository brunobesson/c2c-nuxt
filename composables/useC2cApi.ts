import * as v from 'valibot';
import {
  Area,
  AreaList,
  Article,
  ArticleList,
  Book,
  BookList,
  Feed,
  Image,
  ImageList,
  Map,
  MapList,
  Outing,
  OutingList,
  Profile,
  Route,
  RouteList,
  UserPreferences,
  Waypoint,
  WaypointList,
  Xreport,
  XreportList,
} from '~/api/c2c.js';
import type { ApiLang, UiLang } from '~/api/lang.js';

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

export type Query = Record<string, any>; // TODO

export const useC2cApi = () => {
  const $fetch = useNuxtApp().$c2cFetch;
  const baseUrl = useRuntimeConfig().public.c2cApiBase;

  return {
    userProfile: {
      getPreferences: async () => {
        const result = v.safeParse(UserPreferences, await $fetch('/user/preferences'));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      setPreferredLang: async (lang: UiLang) =>
        $fetch('/users/update_preferred_language', { method: 'POST', body: { lang } }),
    },

    feed: {
      getDefaultFeed: async (query: FeedQuery) => {
        const result = v.safeParse(Feed, await $fetch('/feed', { query }));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      getProfileFeed: async (user: Profile['document_id'], query: FeedQuery) => {
        const result = v.safeParse(Feed, await $fetch('/profile-feed', { query: { ...query, u: user } }));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      getPersonalFeed: async (query: FeedQuery) => {
        const result = v.safeParse(Feed, await $fetch('/personal-feed', { query }));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },

    area: {
      getAll: async (query: Query) => {
        const result = v.safeParse(AreaList, await $fetch(`/areas`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Area['document_id']) => {
        const result = v.safeParse(Area, await $fetch(`/areas/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Area, comment: string) => {
        const result = v.safeParse(
          Area,
          $fetch(`/areas/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Area) => {
        const result = v.safeParse(
          Area,
          $fetch(`/areas/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    article: {
      getAll: async (query: Query) => {
        const result = v.safeParse(ArticleList, await $fetch(`/articles`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Article['document_id']) => {
        const result = v.safeParse(Article, await $fetch(`/articles/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Article, comment: string) => {
        const result = v.safeParse(
          Article,
          $fetch(`/articles/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Article) => {
        const result = v.safeParse(
          Article,
          $fetch(`/articles/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    book: {
      getAll: async (query: Query) => {
        const result = v.safeParse(BookList, await $fetch(`/books`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Book['document_id']) => {
        const result = v.safeParse(Book, await $fetch(`/books/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Book, comment: string) => {
        const result = v.safeParse(
          Book,
          $fetch(`/books/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Book) => {
        const result = v.safeParse(
          Book,
          $fetch(`/books/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    image: {
      getAll: async (query: Query) => {
        const result = v.safeParse(ImageList, await $fetch(`/images`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Image['document_id']) => {
        const result = v.safeParse(Image, await $fetch(`/images/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Image, comment: string) => {
        const result = v.safeParse(
          Image,
          $fetch(`/images/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Image) => {
        const result = v.safeParse(
          Image,
          $fetch(`/images/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    map: {
      getAll: async (query: Query) => {
        const result = v.safeParse(MapList, await $fetch(`/maps`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Map['document_id']) => {
        const result = v.safeParse(Map, await $fetch(`/maps/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Map, comment: string) => {
        const result = v.safeParse(
          Map,
          $fetch(`/maps/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Map) => {
        const result = v.safeParse(
          Map,
          $fetch(`/maps/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    outing: {
      getAll: async (query: Query) => {
        const result = v.safeParse(OutingList, await $fetch(`/outings`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Outing['document_id']) => {
        const result = v.safeParse(Outing, await $fetch(`/outings/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Outing, comment: string) => {
        const result = v.safeParse(
          Outing,
          $fetch(`/outings/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Outing) => {
        const result = v.safeParse(
          Outing,
          $fetch(`/outings/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    profile: {
      get: async (id: Profile['document_id']) => {
        const result = v.safeParse(Profile, await $fetch(`/profiles/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Profile, comment: string) => {
        const result = v.safeParse(
          Profile,
          $fetch(`/profiles/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    route: {
      getAll: async (query: Query) => {
        const result = v.safeParse(RouteList, await $fetch(`/routes`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Route['document_id']) => {
        const result = v.safeParse(Route, await $fetch(`/routes/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Route, comment: string) => {
        const result = v.safeParse(
          Route,
          $fetch(`/routes/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Route) => {
        const result = v.safeParse(
          Route,
          $fetch(`/routes/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    waypoint: {
      getAll: async (query: Query) => {
        const result = v.safeParse(WaypointList, await $fetch(`/waypoints`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Waypoint['document_id']) => {
        const result = v.safeParse(Waypoint, await $fetch(`/waypoints/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Waypoint, comment: string) => {
        const result = v.safeParse(
          Waypoint,
          $fetch(`/waypoints/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Waypoint) => {
        const result = v.safeParse(
          Waypoint,
          $fetch(`/waypoints/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    xreport: {
      getAll: async (query: Query) => {
        const result = v.safeParse(XreportList, await $fetch(`/xreports`, { query }));
        if (result.success) {
          return result.output.documents;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      get: async (id: Xreport['document_id']) => {
        const result = v.safeParse(Xreport, await $fetch(`/xreports/${id}`));
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      save: async (document: Xreport, comment: string) => {
        const result = v.safeParse(
          Xreport,
          $fetch(`/xreports/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
      create: async (document: Xreport) => {
        const result = v.safeParse(
          Xreport,
          $fetch(`/xreports/${document.document_id}`, { method: 'POST', body: { document } }),
        );
        if (result.success) {
          return result.output;
        }
        console.group('Error fetching data from API');
        console.trace(result.issues);
        console.groupEnd();
        throw new Error('Server API response does not match expectation');
      },
    },
    baseUrl,
  };
};

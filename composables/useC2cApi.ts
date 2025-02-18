import {
  Account,
  Area,
  AreaList,
  AreaVersion,
  Article,
  ArticleList,
  ArticleVersion,
  AssociationsHistory,
  Book,
  BookList,
  BookVersion,
  CookerResponse,
  CreateImagesOutput,
  CreateTopicOutput,
  DocumentHistory,
  Feed,
  Following,
  Image,
  ImageList,
  ImageVersion,
  IsBlocked,
  IsFollowing,
  IsTagged,
  LoginResponse,
  LogoutResponse,
  Map,
  MapList,
  Outing,
  OutingList,
  OutingVersion,
  Profile,
  RegisterResponse,
  Route,
  RouteList,
  RouteVersion,
  UserPreferences,
  Waypoint,
  WaypointList,
  WaypointVersion,
  Whatsnew,
  Xreport,
  XreportList,
  XreportVersion,
  type CreateImagesInput,
  type Document,
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

export type WhatsnewQuery = {
  /** How many entries should be returned (default: 10). The maximum is 50. */
  limit?: number;
  /**
   * The pagination token. When requesting a feed, the response includes a `pagination_token`. This token is to be used
   * to request the next page.
   */
  token?: string | undefined;
  /** Changes made by one user. */
  u?: number;
};

export type AssociationsHistoryQuery = {
  /** How many entries should be returned (default: 50). The maximum is 500. */
  limit?: number;
  /**
   * The request offest.
   */
  offset?: number | undefined;
  /** Changes made by one user. */
  u?: number;
  /** Changes made on a document */
  d?: number;
};

export type Query = Record<string, any>; // TODO

const { checkResponse } = useSchemaValidation();

function checkTagType(type: Document['type']) {
  if (type !== 'r') {
    // As for now, only routes may be tagged.
    throw new Error('Tags are not supported for this kind of document');
  }
}

export const useC2cApi = () => {
  const $fetch = useNuxtApp().$c2cFetch.raw;
  const baseUrl = useRuntimeConfig().public.c2cApiBase;

  return {
    user: {
      getPreferences: async () => checkResponse(UserPreferences, await $fetch('/user/preferences')),
      updatePreferences: async (preferences: UserPreferences) =>
        await $fetch<void>('/user/preferences', { method: 'POST', body: preferences }),
      setPreferredLang: async (lang: UiLang) =>
        $fetch<void>('/users/update_preferred_language', { method: 'POST', body: { lang } }),
      following: async () => checkResponse(Following, await $fetch('/users/following')),
      follow: async (user: Profile['document_id']) =>
        await $fetch<void>('/users/follow', { method: 'POST', body: { user_id: user } }),
      unfollow: async (user: Profile['document_id']) =>
        await $fetch<void>('/users/unfollow', { method: 'POST', body: { user_id: user } }),
      isFollowing: async (user: Profile['document_id']) =>
        checkResponse(IsFollowing, await $fetch(`/users/following-user/${user}`)),
      getAccount: async () => checkResponse(Account, await $fetch('/account')),
      updateAccount: async (
        currentPassword: string,
        name: string | null,
        forumUsername: string | null,
        email: string | null,
        isProfilePublic: boolean | null,
        newPassword: string | null,
      ) => {
        return await $fetch<void>('/account', {
          method: 'POST',
          body: {
            currentpassord: currentPassword,
            ...(name !== null && { name }),
            ...(forumUsername !== null && { forum_username: forumUsername }),
            ...(email !== null && { email }),
            ...(isProfilePublic !== null && { is_profile_public: isProfilePublic }),
            ...(newPassword !== null && { newpassword: newPassword }),
          },
        });
      },
      login: async (username: string, password: string) =>
        checkResponse(LoginResponse, await $fetch('/users/login', { body: { username, password, discourse: true } })),
      logout: async () =>
        await checkResponse(
          LogoutResponse,
          await $fetch('/users/logout', { method: 'POST', body: { discourse: true } }),
        ),
      expiredTokenLogout: async (expiredToken: string) =>
        await checkResponse(
          LogoutResponse,
          await $fetch('/users/logout', {
            method: 'POST',
            body: { discourse: true },
            headers: { Authorization: `JWT token='${expiredToken}'` },
          }),
        ),
      requestPasswordChange: async (email: string) =>
        await $fetch<void>('/users/request_password_change', { method: 'POST', body: { email } }),
      validateNewPassword: async (nonce: string, password: string) =>
        await checkResponse(
          LoginResponse,
          await $fetch(`/users/validate_new_password/${nonce}`, { method: 'POST', body: { password } }),
        ),
      register: async (data: {
        name: string;
        username: string;
        forum_username: string;
        password: string;
        email: string;
        lang: UiLang;
        captch: string;
      }) => await checkResponse(RegisterResponse, await $fetch('/users/register', { method: 'POST', body: data })),
      validateChangeEmail: async (nonce: string) => await $fetch<void>(`/users/validate_change_email/${nonce}`),
      validateRegisterEmail: async (nonce: string) =>
        await checkResponse(LoginResponse, await $fetch(`/users/validate_register_email/${nonce}`)),
    },

    feed: {
      getDefaultFeed: async (query: FeedQuery) => checkResponse(Feed, await $fetch('/feed', { query })),
      getProfileFeed: async (user: Profile['document_id'], query: FeedQuery) =>
        checkResponse(Feed, await $fetch('/profile-feed', { query: { ...query, u: user } })),
      getPersonalFeed: async (query: FeedQuery) => checkResponse(Feed, await $fetch('/personal-feed', { query })),
    },

    document: {
      whatsnew: async (query: WhatsnewQuery) => checkResponse(Whatsnew, await $fetch('/documents/changes', { query })),
      search: (params: unknown) => undefined, // TODO
      history: async (document: Document['document_id'], lang: ApiLang) =>
        checkResponse(DocumentHistory, await $fetch(`/document/${document}/history/${lang}`)),
      mask: async (document: Document['document_id'], lang: ApiLang, version: number) =>
        await $fetch('/versions/mask', { method: 'POST', body: { document_id: document, lang, version_id: version } }),
      unmask: async (document: Document['document_id'], lang: ApiLang, version: number) =>
        await $fetch('/versions/unmask', {
          method: 'POST',
          body: { document_id: document, lang, version_id: version },
        }),
      cook: async (content: Record<string, string>) =>
        await checkResponse(CookerResponse, await $fetch('/cooker', { method: 'POST', body: { content } })),
    },

    area: {
      getAll: async (query: Query) => checkResponse(AreaList, await $fetch(`/areas`, { query })),
      get: async (id: Area['document_id'], lang: ApiLang) =>
        checkResponse(Area, await $fetch(`/areas/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Area['document_id'], lang: ApiLang, version: AreaVersion['version']['version_id']) =>
        checkResponse(AreaVersion, await $fetch(`/areas/${id}/${lang}/${version}`)),
      save: async (document: Area, comment: string) =>
        checkResponse(
          Area,
          await $fetch(`/areas/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Area) =>
        checkResponse(Area, await $fetch(`/areas/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    article: {
      getAll: async (query: Query) => checkResponse(ArticleList, await $fetch(`/articles`, { query })),
      get: async (id: Article['document_id'], lang: ApiLang) =>
        checkResponse(Article, await $fetch(`/articles/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Article['document_id'], lang: ApiLang, version: ArticleVersion['version']['version_id']) =>
        checkResponse(ArticleVersion, await $fetch(`/articles/${id}/${lang}/${version}`)),
      save: async (document: Article, comment: string) =>
        checkResponse(
          Article,
          await $fetch(`/articles/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Article) =>
        checkResponse(
          Article,
          await $fetch(`/articles/${document.document_id}`, { method: 'POST', body: { document } }),
        ),
    },
    book: {
      getAll: async (query: Query) => checkResponse(BookList, await $fetch(`/books`, { query })),
      get: async (id: Book['document_id'], lang: ApiLang) =>
        checkResponse(Book, await $fetch(`/books/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Book['document_id'], lang: ApiLang, version: BookVersion['version']['version_id']) =>
        checkResponse(BookVersion, await $fetch(`/books/${id}/${lang}/${version}`)),
      save: async (document: Book, comment: string) =>
        checkResponse(
          Book,
          await $fetch(`/books/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Book) =>
        checkResponse(Book, await $fetch(`/books/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    image: {
      getAll: async (query: Query) => checkResponse(ImageList, await $fetch(`/images`, { query })),
      get: async (id: Image['document_id'], lang: ApiLang) =>
        checkResponse(Image, await $fetch(`/images/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Image['document_id'], lang: ApiLang, version: ImageVersion['version']['version_id']) =>
        checkResponse(ImageVersion, await $fetch(`/images/${id}/${lang}/${version}`)),
      save: async (document: Image, comment: string) =>
        checkResponse(
          Image,
          await $fetch(`/images/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Image) =>
        checkResponse(Image, await $fetch(`/images/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    map: {
      getAll: async (query: Query) => checkResponse(MapList, await $fetch(`/maps`, { query })),
      get: async (id: Map['document_id'], lang: ApiLang) =>
        checkResponse(Map, await $fetch(`/maps/${id}`, { query: { cook: lang } })),
      save: async (document: Map, comment: string) =>
        checkResponse(
          Map,
          await $fetch(`/maps/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Map) =>
        checkResponse(Map, await $fetch(`/maps/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    outing: {
      getAll: async (query: Query) => checkResponse(OutingList, await $fetch(`/outings`, { query })),
      get: async (id: Outing['document_id'], lang: ApiLang) =>
        checkResponse(Outing, await $fetch(`/outings/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Outing['document_id'], lang: ApiLang, version: OutingVersion['version']['version_id']) =>
        checkResponse(OutingVersion, await $fetch(`/outings/${id}/${lang}/${version}`)),
      save: async (document: Outing, comment: string) =>
        checkResponse(
          Outing,
          await $fetch(`/outings/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Outing) =>
        checkResponse(Outing, await $fetch(`/outings/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    profile: {
      get: async (id: Profile['document_id'], lang: ApiLang) =>
        checkResponse(Profile, await $fetch(`/profiles/${id}`, { query: { cook: lang } })),
      save: async (document: Profile, comment: string) =>
        checkResponse(
          Profile,
          await $fetch(`/profiles/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
    },
    route: {
      getAll: async (query: Query) => checkResponse(RouteList, await $fetch(`/routes`, { query })),
      get: async (id: Route['document_id'], lang: ApiLang) =>
        checkResponse(Route, await $fetch(`/routes/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Route['document_id'], lang: ApiLang, version: RouteVersion['version']['version_id']) =>
        checkResponse(RouteVersion, await $fetch(`/routes/${id}/${lang}/${version}`)),
      save: async (document: Route, comment: string) =>
        checkResponse(
          Route,
          await $fetch(`/routes/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Route) =>
        checkResponse(Route, await $fetch(`/routes/${document.document_id}`, { method: 'POST', body: { document } })),
    },
    waypoint: {
      getAll: async (query: Query) => checkResponse(WaypointList, await $fetch(`/waypoints`, { query })),
      get: async (id: Waypoint['document_id'], lang: ApiLang) =>
        checkResponse(Waypoint, await $fetch(`/waypoints/${id}`, { query: { cook: lang } })),
      getVersion: async (
        id: Waypoint['document_id'],
        lang: ApiLang,
        version: WaypointVersion['version']['version_id'],
      ) => checkResponse(WaypointVersion, await $fetch(`/waypoints/${id}/${lang}/${version}`)),
      save: async (document: Waypoint, comment: string) =>
        checkResponse(
          Waypoint,
          await $fetch(`/waypoints/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Waypoint) =>
        checkResponse(
          Waypoint,
          await $fetch(`/waypoints/${document.document_id}`, { method: 'POST', body: { document } }),
        ),
    },
    xreport: {
      getAll: async (query: Query) => checkResponse(XreportList, await $fetch(`/xreports`, { query })),
      get: async (id: Xreport['document_id'], lang: ApiLang) =>
        checkResponse(Xreport, await $fetch(`/xreports/${id}`, { query: { cook: lang } })),
      getVersion: async (id: Xreport['document_id'], lang: ApiLang, version: XreportVersion['version']['version_id']) =>
        checkResponse(XreportVersion, await $fetch(`/xreports/${id}/${lang}/${version}`)),
      save: async (document: Xreport, comment: string) =>
        checkResponse(
          Xreport,
          await $fetch(`/xreports/${document.document_id}`, { method: 'PUT', body: { document, message: comment } }),
        ),
      create: async (document: Xreport) =>
        checkResponse(
          Xreport,
          await $fetch(`/xreports/${document.document_id}`, { method: 'POST', body: { document } }),
        ),
    },

    associations: {
      create: async (parent: Document, child: Document) => {
        const parentType = parent.type;
        const childType = child.type;
        // https://github.com/c2corg/v6_ui/blob/c9962a6c3bac0670eab732d563f9f480379f84d1/c2corg_ui/static/js/addassociation.js#L91
        // parent and child type are predetermined
        const invert =
          (parentType === 'c' && ['w', 'o', 'r', 'b', 'c', 'x', 'u'].includes(childType)) ||
          parentType === 'i' ||
          (parentType === 'o' && ['r', 'u'].includes(childType)) ||
          (parentType === 'r' && ['w', 'b'].includes(childType)) ||
          (parentType === 'w' && childType === 'b') ||
          (parentType === 'x' && ['w', 'o', 'r', 'u'].includes(childType));
        const body: { parent_document_id: Document['document_id']; child_document_id: Document['document_id'] } = invert
          ? { parent_document_id: child.document_id, child_document_id: parent.document_id }
          : { parent_document_id: parent.document_id, child_document_id: child.document_id };
        return $fetch<void>('/associations', {
          method: 'POST',
          body,
        });
      },
      remove: async (parent: Document, child: Document) =>
        await $fetch<void>('/associations', {
          method: 'DELETE',
          body: { parent_document_id: parent.document_id, child_document_id: child.document_id },
        }),
      history: async (query: AssociationsHistoryQuery) =>
        checkResponse(AssociationsHistory, await $fetch('/associations-history', { query })),
    },

    tags: {
      isTagged: async ({ document_id, type }: Document) => {
        checkTagType(type);
        return await checkResponse(IsTagged, await $fetch(`/tags/has/${document_id}`));
      },
      add: async ({ document_id, type }: Document) => {
        checkTagType(type);
        return await $fetch<void>('/tags/add', { method: 'POST', body: { document_id } });
      },
      remove: async ({ document_id, type }: Document) => {
        checkTagType(type);
        return await $fetch<void>('/tags/remove', { method: 'POST', body: { document_id } });
      },
    },

    images: {
      create: async (images: CreateImagesInput) =>
        await checkResponse(CreateImagesOutput, await $fetch('/images/list', { method: 'POST', body: { images } })),
    },

    moderator: {
      protectDocument: async (document: Document['document_id']) =>
        await $fetch<void>('/documents/protect', { method: 'POST', body: { document_id: document } }),
      unprotectDocument: async (document: Document['document_id']) =>
        await $fetch<void>('/documents/unprotect', { method: 'POST', body: { document_id: document } }),
      deleteDocument: async (document: Document['document_id']) =>
        await $fetch<void>(`/documents/delete/${document}`, { method: 'DELETE' }),
      deleteLocale: async (document: Document['document_id'], lang: ApiLang) =>
        await $fetch<void>(`/documents/delete/${document}/${lang}`, { method: 'DELETE' }),
      mergeDocuments: async (source: Document['document_id'], target: Document['document_id']) =>
        await $fetch<void>('/documents/merge', {
          method: 'POST',
          body: { source_document_id: source, target_document_id: target },
        }),
      revertDocument: async (document: Document['document_id'], lang: ApiLang, version: number) =>
        await $fetch<void>('/documents/revert', {
          method: 'POST',
          body: { document_id: document, lang, version_id: version },
        }),
      isAccountBlocked: async (user: Profile['document_id']) =>
        await checkResponse(IsBlocked, await $fetch(`/users/blocked/${user}`)),
      blockAccount: async (user: Profile['document_id']) =>
        await $fetch<void>('/users/block', { method: 'POST', body: { user_id: user } }),
      unblockAccount: async (user: Profile['document_id']) =>
        await $fetch<void>('/users/unblock', { method: 'POST', body: { user_id: user } }),
      maskVersion: async (document: Document['document_id'], lang: ApiLang, version: number) =>
        await $fetch<void>('/versions/mask', {
          method: 'POST',
          body: { document_id: document, lang, version_id: version },
        }),
      unmaskVersion: async (document: Document['document_id'], lang: ApiLang, version: number) =>
        await $fetch<void>('/versions/unmask', {
          method: 'POST',
          body: { document_id: document, lang, version_id: version },
        }),
    },

    forum: {
      createTopic: async (document: Document['document_id'], lang: ApiLang): Promise<CreateTopicOutput> =>
        await checkResponse(
          CreateTopicOutput,
          await $fetch('/forum/topics', { method: 'POST', body: { document_id: document, lang } }),
        ),
    },

    baseUrl,
  };
};

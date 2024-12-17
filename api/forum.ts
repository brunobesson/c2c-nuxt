import type { AsyncData, AsyncDataOptions, UseFetchOptions } from '#app';
import type { ISODateTime } from '~/types/index.js';

const baseUrl = 'https://forum.camptocamp.org'; // TODO

type Latest = {
  users: {
    username: string;
    avatar_template: string;
  }[];
  topic_list: {
    topics: {
      id: number;
      title: string;
      slug: string;
      highest_post_number: number;
      last_poster_username: string;
    }[];
  };
};

export type Topic = {
  id: number;
  title: string;
  slug: string;
  highest_post_number: number;
  last_poster_username: string;
  last_poster_avatar_template: string;
};

export const getLatest = (
  excludedCategories: number[] = [],
  options: UseFetchOptions<any> = {} // TODO FIXME
) => {
  let query = '';
  if (excludedCategories.length) {
    query =
      '?' +
      excludedCategories.map((id) => `exclude_category_ids[]=${id}`).join('&');
  }
  const transform = (input: Latest) => {
    const userAvatars = new Map<string, string>();
    input.users.forEach((user) =>
      userAvatars.set(user.username, user.avatar_template)
    );
    return input.topic_list.topics.map(
      (topic) =>
        ({
          ...topic,
          last_poster_avatar_template: userAvatars.get(
            topic.last_poster_username
          ),
        } as AsyncDataOptions<Latest, Topic[]>)
    );
  };
  return useFetch(`${baseUrl}/latest.json${query}`, {
    transform,
    ...options,
  }) as AsyncData<Topic[] | null, Error | null>;
};

export const getAvatarUrl = (avatarTemplate: string, size: number) => {
  const template = avatarTemplate.startsWith('/')
    ? baseUrl + avatarTemplate
    : avatarTemplate;
  return template.replace('{size}', size.toString());
};

export type Announcement = {
  tags: string[];
  post_stream: {
    posts: {
      updated_at: ISODateTime;
      cooked: string;
    }[];
  };
  posts_count: number;
};

export const getAnnouncement = (
  lang: string,
  options: UseFetchOptions<Announcement> = {}
) =>
  useFetch<Announcement>(
    `${baseUrl}/t/annonce-${
      ['zh_CN', 'hu', 'sl'].includes(lang) ? 'en' : lang
    }.json`,
    { pick: ['tags', 'post_stream'], ...options }
  );

export const getBoardAnnouncement = (
  options: UseFetchOptions<Announcement> = {}
) =>
  useFetch<Announcement>(`${baseUrl}/t/publication-ca.json`, {
    pick: ['tags', 'post_stream', 'posts_count'],
    ...options,
  });

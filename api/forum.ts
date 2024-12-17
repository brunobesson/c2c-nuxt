import type { ISODateTime } from '~/types/index.js';

export type Latest = {
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

import * as v from 'valibot';
import { IsoDateTime, PositiveInt, Uint } from '~/types/common.js';

export const Latest = v.object({
  users: v.array(
    v.object({
      username: v.string(),
      avatar_template: v.string(),
    }),
  ),
  topic_list: v.object({
    topics: v.array(
      v.object({
        id: PositiveInt,
        title: v.string(),
        slug: v.string(),
        highest_post_number: Uint,
        last_poster_username: v.string(),
      }),
    ),
  }),
});
export type Latest = v.InferOutput<typeof Latest>;

export const Topic = v.object({
  id: PositiveInt,
  title: v.string(),
  slug: v.string(),
  highest_post_number: PositiveInt,
  last_poster_username: v.string(),
  last_poster_avatar_template: v.string(),
});
export type Topic = v.InferOutput<typeof Topic>;

export const Announcement = v.object({
  tags: v.array(v.string()),
  post_stream: v.object({
    posts: v.array(
      v.object({
        updated_at: IsoDateTime,
        cooked: v.string(),
      }),
    ),
  }),
  posts_count: Uint,
});
export type Announcement = v.InferOutput<typeof Announcement>;

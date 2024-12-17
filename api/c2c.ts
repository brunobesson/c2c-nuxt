import type { UseFetchOptions } from '#app';
import type { ISODate } from '../types/index.js';

const baseUrl = 'https://api.camptocamp.org'; // TODO

export type LetterType = 'a' | 'c' | 'i' | 'm' | 'o' | 'r' | 'u' | 'w' | 'b' | 'x';
type Geometry = {
  version: number;
  geom: string;
  geom_detail?: string;
};
export type BaseDocument = {
  document_id: number;
  type: LetterType;
  version: number;
  protected: boolean;
  redirects_to: any;
  quality: string;
  geometry: Geometry;
  locales: { lang: string; version: number; title: string; title_prefix?: string; summary?: string }[]; // TODO
};
type Area = BaseDocument & { type: 'a' }; // TODO
type Article = BaseDocument & { type: 'c' }; // TODO
type Image = BaseDocument & { type: 'i' }; // TODO
type Map = BaseDocument & { type: 'm' }; // TODO
export type Outing = BaseDocument & {
  type: 'o';
  quality: string;
  activities: string[];
  date_start: ISODate;
  date_end: ISODate;
};
type Route = BaseDocument & { type: 'r' }; // TODO
type Profile = BaseDocument & { type: 'u'; name: string }; // TODO
type Waypoint = BaseDocument & { type: 'w' }; // TODO
type Book = BaseDocument & { type: 'b' }; // TODO
type Xreport = BaseDocument & { type: 'x' }; // TODO
export type Document = Area | Article | Image | Map | Outing | Route | Profile | Waypoint | Book | Xreport;
export type Documents<T extends Document> = { documents: T[]; total: number };

export const getAllOutings = (options?: UseFetchOptions<Documents<Outing>>) =>
  useFetch<Documents<Outing>>(`${baseUrl}/outings`, { ...options });

export const allOutings = `${baseUrl}/outings`;

export type UserPreferences =
  | {
      followed_only: false;
      activities: []; // TODO
      areas: {
        type: 'a';
        version: number;
        protected: boolean;
        document_id: number;
        area_type: string; // TODO
        available_langs: string[]; // TODO
        locales: {
          title: string;
          lang: string; // TODO
          version: number;
        };
      }[];
      langs: string[]; // TODO
    }
  | {
      followed_only: true;
      activities: never[];
      areas: never[];
      langs: never[];
    };
export const userPreferences = `${baseUrl}/users/preferences`;

import type { ISODate } from '../types/index.js';

export type LetterType = 'a' | 'c' | 'i' | 'm' | 'o' | 'r' | 'u' | 'w' | 'b' | 'x';

export type Activity =
  | 'skitouring'
  | 'snow_ice_mixed'
  | 'mountain_climbing'
  | 'rock_climbing'
  | 'ice_climbing'
  | 'hiking'
  | 'snowshoeing'
  | 'paragliding'
  | 'mountain_biking'
  | 'via_ferrata'
  | 'slacklining';
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

export const OUTINGS = '/outings';

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
export const USER_PREFERENCES = '/users/preferences';

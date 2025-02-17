import * as v from 'valibot';
import isISO8601 from 'validator/es/lib/isISO8601.js';
import {
  AreaListing,
  ArticleListing,
  BookListing,
  Image,
  ImageListing,
  MapListing,
  Outing,
  OutingListing,
  Profile,
  Route,
  RouteListing,
  WaypointListing,
  XreportListing,
  type Area,
  type AreaVersionDocument,
  type Article,
  type ArticleVersionDocument,
  type Book,
  type BookVersionDocument,
  type Document,
  type DocumentListing,
  type ImageVersionDocument,
  type Map,
  type OutingVersionDocument,
  type ProfileListing,
  type RouteVersionDocument,
  type VersionInfo,
  type Waypoint,
  type WaypointVersionDocument,
  type WhatsnewDocument,
  type Xreport,
  type XreportVersionDocument,
} from '~/api/c2c.js';

// Some utilities

export const Uint = v.pipe(v.number(), v.integer(), v.minValue(0), v.finite());

export const PositiveInt = v.pipe(v.number(), v.integer(), v.minValue(1), v.finite());

export const IsoDate = v.pipe(v.string(), v.isoDate());
export type IsoDate = v.InferOutput<typeof IsoDate>;

export const IsoDateTime = v.pipe(
  v.string(),
  v.check(input => isISO8601(input, { strict: true, strictSeparator: true })),
);
export type IsoDateTime = v.InferOutput<typeof IsoDateTime>;

export const isDocumentListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is DocumentListing => doc instanceof Object && !('associations' in doc) && !('title' in doc);
export const isAreaListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is AreaListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'a' && !('associations' in doc) && !('title' in doc);
export const isArticleListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is ArticleListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'c' && !('associations' in doc) && !('title' in doc);
export const isBookListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is BookListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'b' && !('associations' in doc) && !('title' in doc);
export const isImageListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is ImageListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'i' && !('associations' in doc) && !('title' in doc);
export const isMapListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is MapListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'm' && !('associations' in doc) && !('title' in doc);
export const isOutingListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is OutingListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'o' && !('associations' in doc) && !('title' in doc);
export const isProfileListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is ProfileListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'u' && !('associations' in doc) && !('title' in doc);
export const isRouteListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is RouteListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'r' && !('associations' in doc) && !('title' in doc);
export const isWaypointListing = (doc: unknown): doc is WaypointListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'w' && !('associations' in doc) && !('title' in doc);
export const isXreportListing = (
  doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument,
): doc is XreportListing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'x' && !('associations' in doc) && !('title' in doc);

export const isDocument = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Document =>
  doc instanceof Object && 'associations' in doc && !('title' in doc);
export const isArea = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Area =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'a' && 'associations' in doc && !('title' in doc);
export const isArticle = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Article =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'c' && 'associations' in doc && !('title' in doc);
export const isBook = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Book =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'b' && 'associations' in doc && !('title' in doc);
export const isImage = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Image =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'i' && 'associations' in doc && !('title' in doc);
export const isMap = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Map =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'm' && 'associations' in doc && !('title' in doc);
export const isOuting = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Outing =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'o' && 'associations' in doc && !('title' in doc);
export const isProfile = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Profile =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'u' && 'associations' in doc && !('title' in doc);
export const isRoute = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Route =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'r' && 'associations' in doc && !('title' in doc);
export const isWaypoint = (doc: unknown): doc is Waypoint =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'w' && 'associations' in doc && !('title' in doc);
export const isXreport = (doc: Document | DocumentListing | WhatsnewDocument | VersionedDocument): doc is Xreport =>
  doc instanceof Object && 'type' in doc && doc['type'] === 'x' && 'associations' in doc && !('title' in doc);

// handling document view
export type MaskedVersionedDocument = {
  version: VersionInfo & {
    next_version_id: number | null;
    previous_version_id: number | null;
  };
};
export type VersionedArea = AreaVersionDocument & MaskedVersionedDocument;
export type VersionedArticle = ArticleVersionDocument & MaskedVersionedDocument;
export type VersionedBook = BookVersionDocument & MaskedVersionedDocument;
export type VersionedImage = ImageVersionDocument & MaskedVersionedDocument;
export type VersionedOuting = OutingVersionDocument & MaskedVersionedDocument;
export type VersionedRoute = RouteVersionDocument & MaskedVersionedDocument;
export type VersionedWaypoint = WaypointVersionDocument & MaskedVersionedDocument;
export type VersionedXreport = XreportVersionDocument & MaskedVersionedDocument;

export type VersionedDocument =
  | VersionedArea
  | VersionedArticle
  | VersionedBook
  | VersionedImage
  | VersionedOuting
  | VersionedRoute
  | VersionedWaypoint
  | VersionedXreport;

export const isMaskedVersionedDocument = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is MaskedVersionedDocument =>
  doc instanceof Object && 'version' in doc && typeof doc['version'] === 'object' && !('type' in doc);
export const isVersionedDocument = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is VersionedDocument =>
  doc instanceof Object && 'version' in doc && typeof doc['version'] === 'object' && 'type' in doc;
export const isVersionedArea = (doc: MaskedVersionedDocument | VersionedDocument | Document): doc is VersionedArea =>
  isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'a';
export const isVersionedArticle = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is VersionedArticle => isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'a';
export const isVersionedBook = (doc: MaskedVersionedDocument | VersionedDocument | Document): doc is VersionedBook =>
  isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'b';
export const isVersionedImage = (doc: MaskedVersionedDocument | VersionedDocument | Document): doc is VersionedImage =>
  isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'i';
export const isVersionedOuting = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is VersionedOuting => isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'o';
export const isVersionedRoute = (doc: MaskedVersionedDocument | VersionedDocument | Document): doc is VersionedRoute =>
  isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'r';
export const isVersionedWaypoint = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is VersionedWaypoint => isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'w';
export const isVersionedXreport = (
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): doc is VersionedXreport => isVersionedDocument(doc) && 'type' in doc && doc['type'] === 'x';

export function assertNotDocumentVersion(
  doc: MaskedVersionedDocument | VersionedDocument | Document,
): asserts doc is Document {
  if (isVersionedDocument(doc) || isMaskedVersionedDocument(doc)) {
    throw new Error('Not a document');
  }
}

export const isWhatnewDocument = (
  doc: Document | DocumentListing | VersionedDocument | WhatsnewDocument,
): doc is WhatsnewDocument => doc instanceof Object && !('locales' in doc);

export type Associations = {
  articles?: ArticleListing[];
  books?: BookListing[];
  images?: ImageListing[];
  outings?: OutingListing[];
  routes?: RouteListing[];
  users?: ProfileListing[];
  waypoints?: WaypointListing[];
  waypoint_children?: WaypointListing[]; // waypoints
  xreports?: XreportListing[];
  recent_outings?: {
    // routes, waypoints
    documents: OutingListing[];
    total: number;
  };
  all_routes?: {
    // waypoints
    documents: RouteListing[];
    total: number;
  };
};

import type {
  AreaType,
  Article,
  ArticleListing,
  ArticleVersionDocument,
  Document,
  DocumentListing,
  DocumentType,
  License,
  WhatsnewDocument,
} from '~/api/c2c.js';
import type { UiLang } from '~/api/lang.js';
import type { VersionedDocument } from '~/types/common.js';
import {
  isImage,
  isImageListing,
  isOuting,
  isOutingListing,
  isProfile,
  isProfileListing,
  isRoute,
  isRouteListing,
  isWaypoint,
  isWhatnewDocument,
} from '~/types/common.js';

export const useDocument = (document: Document | DocumentListing | VersionedDocument | WhatsnewDocument) => {
  const documentTitle = (lang?: UiLang): string => {
    // profile does not have locale, get profile's name
    if (isProfile(document) || isProfileListing(document)) {
      return document.name ?? '';
    }

    // document object returned by whatsnew doesn't have locale either but provides title property
    if (isWhatnewDocument(document)) {
      return document.title;
    }

    if (isRoute(document) || isRouteListing(document)) {
      const { title, title_prefix } = useDocumentLocale().getLocaleSmart(document, lang);
      const colon = lang && ['fr', 'es', 'ca'].includes(lang) ? ' : ' : ': ';
      return title_prefix + colon + title;
    }

    const { title } = useDocumentLocale().getLocaleSmart(document, lang);
    return title ?? '';
  };

  const documentType: ComputedRef<DocumentType> = computed(() => {
    switch (document.type) {
      case 'a':
        return 'area';
      case 'b':
        return 'book';
      case 'c':
        return 'article';
      case 'i':
        return 'image';
      case 'm':
        return 'map';
      case 'o':
        return 'outing';
      case 'r':
        return 'route';
      case 'u':
        return 'profile';
      case 'w':
        return 'waypoint';
      case 'x':
        return 'xreport';
    }
  });

  const documentLicense: ComputedRef<License | undefined> = computed(() => {
    if (isWhatnewDocument(document)) {
      return undefined;
    }
    switch (document.type) {
      case 'r':
      case 'w':
      case 'a':
      case 'b':
      case 'm':
        return 'by-sa';
      case 'o':
      case 'u':
      case 'x':
        return 'by-nc-nd';
      case 'c':
        return (document as Article | ArticleListing | ArticleVersionDocument).article_type === 'personal'
          ? 'by-nc-nd'
          : 'by-sa';
      case 'i': {
        if (isImage(document)) {
          switch (document.image_type) {
            case 'collaborative':
              return 'by-sa';
            case 'personal':
              return 'by-nc-nd';
            case 'copyright':
              return 'copyright';
          }
        } else {
          // image listing => we don't know (but we don't use it)
          return undefined;
        }
      }
    }
  });

  const sortedAreaList = computed(() => {
    if (
      !isImage(document) &&
      !isImageListing(document) &&
      !isOuting(document) &&
      !isOutingListing(document) &&
      !isProfile(document) &&
      !isProfileListing(document) &&
      !isRoute(document) &&
      !isRouteListing(document) &&
      !isWaypoint(document)
    ) {
      return '';
    }
    // the areas often come in different orders within 3 area objects.
    const orderedAreas: Record<AreaType, string[]> = { range: [], admin_limits: [], country: [] };
    for (const area of document.areas) {
      orderedAreas[area.area_type].push(useDocumentLocale().getLocaleSmart(area).title);
    }
    return orderedAreas.range.concat(orderedAreas.admin_limits).concat(orderedAreas.country).join(' - ');
  });

  return { documentTitle, documentType, documentLicense, sortedAreaList };
};

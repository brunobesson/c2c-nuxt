import type {
  AreaType,
  Article,
  ArticleListing,
  ArticleVersionDocument,
  Document,
  DocumentFormEdit,
  DocumentListing,
  DocumentType,
  License,
  WhatsnewDocument,
} from '~/api/c2c.js';
import type { VersionedDocument } from '~/types/common.js';
import {
  isDocumentFormEdit,
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

export const useDocument = (
  document: MaybeRefOrGetter<Document | DocumentListing | VersionedDocument | WhatsnewDocument | DocumentFormEdit>,
) => {
  const doc = toRef(document);
  const documentTitle = (lang?: string): string => {
    // profile does not have locale, get profile's name
    if (isProfile(doc.value) || isProfileListing(doc.value)) {
      return doc.value.name ?? '';
    }

    // document object returned by whatsnew doesn't have locale either but provides title property
    if (isWhatnewDocument(doc.value)) {
      return doc.value.title;
    }

    if (isRoute(doc.value) || isRouteListing(doc.value)) {
      const { title, title_prefix } = useDocumentLocale().getLocaleSmart(doc.value, lang);
      const colon = lang && ['fr', 'es', 'ca'].includes(lang) ? ' : ' : ': ';
      return title_prefix + colon + title;
    }

    if (isDocumentFormEdit(doc.value)) {
      return doc.value['locale.title'];
    }

    const { title } = useDocumentLocale().getLocaleSmart(doc.value, lang);
    return title ?? '';
  };

  const docType: ComputedRef<DocumentType> = computed(() => documentType(doc.value.type));

  const documentLicense: ComputedRef<License | undefined> = computed(() => {
    if (isWhatnewDocument(doc.value)) {
      return undefined;
    }
    switch (doc.value.type) {
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
        return (doc.value as Article | ArticleListing | ArticleVersionDocument).article_type === 'personal'
          ? 'by-nc-nd'
          : 'by-sa';
      case 'i': {
        if (isImage(doc.value)) {
          switch (doc.value.image_type) {
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
      !isImage(doc.value) &&
      !isImageListing(doc.value) &&
      !isOuting(doc.value) &&
      !isOutingListing(doc.value) &&
      !isProfile(doc.value) &&
      !isProfileListing(doc.value) &&
      !isRoute(doc.value) &&
      !isRouteListing(doc.value) &&
      !isWaypoint(doc.value)
    ) {
      return '';
    }
    // the areas often come in different orders within 3 area objects.
    const orderedAreas: Record<AreaType, string[]> = { range: [], admin_limits: [], country: [] };
    for (const area of doc.value.areas) {
      orderedAreas[area.area_type].push(useDocumentLocale().getLocaleSmart(area).title);
    }
    return orderedAreas.range.concat(orderedAreas.admin_limits).concat(orderedAreas.country).join(' - ');
  });

  return { documentTitle, documentType: docType, documentLicense, sortedAreaList };
};

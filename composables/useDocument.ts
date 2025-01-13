import type { AreaType, BaseDocument, RouteListingLocale, RouteLocale } from '~/api/c2c.js';
import { isImage, isOuting, isProfile, isRoute, isWaypoint } from '~/api/c2c.js';
import type { UiLang } from '~/api/lang.js';

export const useDocument = (document: BaseDocument) => {
  const documentTitle = (lang: UiLang): string => {
    // profile does not have locale, get profile's name
    if (isProfile(document)) {
      return document.name ?? '';
    }

    // TODO typing
    // document object returned by whatsnew does not have locale either
    // but provides title property
    if (!document.locales) {
      return /* document.title ?? */ '';
    }

    const locale = useDocumentLocale().getLocaleSmart(document, lang);

    if (isRoute(document)) {
      const colon = ['fr', 'es', 'ca'].includes(locale.lang) ? ' : ' : ': ';
      return (locale as RouteLocale | RouteListingLocale).title_prefix + colon + locale.title;
    }

    return locale.title ?? '';
  };

  const documentType = computed(() => {
    // TODO return constants.letterToDocumentType[letterType];
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
      default:
        throw new Error('TODO');
    }
  });

  const sortedAreaList = computed(() => {
    if (
      !isImage(document) &&
      !isOuting(document) &&
      !isProfile(document) &&
      !isRoute(document) &&
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

  return { documentTitle, documentType, sortedAreaList };
};

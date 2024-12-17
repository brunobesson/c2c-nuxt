import type { Document } from '~/api/c2c.js';

export const useDocument = (document: Document) => {
  const { locale: currentLocale } = useI18n();
  // TODO
  const documentTitle = (lang: string): string => {
    // profile does not have locale, get profile's name
    if (document.type === 'u') {
      return document.name ?? '';
    }

    // TODO
    // document object returned by whatsnew does not have locale either
    // but provides title property
    if (!document.locales) {
      return /* document.title ?? */ '';
    }

    const locale = getLocaleSmart(lang);

    if (locale.title_prefix) {
      return locale.title_prefix + ' : ' + locale.title;
    }

    return locale.title ?? '';
  };

  const getLocaleStupid = (lang: string) => {
    if (!document.locales) {
      return null;
    }

    const { apiLang } = useApiLang();
    const locale = apiLang(lang);

    for (const result of document.locales) {
      if (result.lang === locale) {
        return result;
      }
    }

    return null;
  };

  const getLocaleSmart = (lang: string) => {
    // first of all try to search asked lang
    let result = lang ? getLocaleStupid(lang) : null;

    if (result) {
      return result;
    }

    // else, search user lang
    result = getLocaleStupid(currentLocale.value);
    if (result) {
      return result;
    }

    // else try langs by order // TODO langs
    for (const lang of ['fr', 'en', 'it', 'de', 'es', 'ca', 'eu', 'sl', 'zh']) {
      result = getLocaleStupid(lang);
      if (result) {
        return result;
      }
    }

    throw new Error('Impossible to find matching lang, should never happen');
  };

  function getDocumentType() {
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
  }
  const documentType = getDocumentType();

  return { documentTitle, documentType };
};

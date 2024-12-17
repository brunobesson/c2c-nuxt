import type { Document, LetterType } from '~/api/c2c.js';

export const useDocument = () => {
  const { locale: currentLocale } = useI18n();
  // TODO
  const documentTitle = (document: Document, lang: string): string => {
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

    const locale = getLocaleSmart(document, lang);

    if (locale.title_prefix) {
      return locale.title_prefix + ' : ' + locale.title;
    }

    return locale.title ?? '';
  };

  const getLocaleStupid = (document: Document, lang: string) => {
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

  const getLocaleSmart = (document: Document, lang: string) => {
    // first of all try to search asked lang
    let result = lang ? getLocaleStupid(document, lang) : null;

    if (result) {
      return result;
    }

    // else, search user lang
    result = getLocaleStupid(document, currentLocale.value);
    if (result) {
      return result;
    }

    // else try langs by order // TODO langs
    for (const lang of ['fr', 'en', 'it', 'de', 'es', 'ca', 'eu', 'sl', 'zh']) {
      result = getLocaleStupid(document, lang);
      if (result) {
        return result;
      }
    }

    throw new Error('Impossible to find matching lang, should never happen');
  };

  const documentType = (letter: LetterType) => {
    // TODO return constants.letterToDocumentType[letterType];
    switch (letter) {
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
  };

  return { documentTitle, documentType };
};

import type { BaseDocument, Route, Unpacked } from '~/api/c2c.js';
import { isProfile, isRoute } from '~/api/c2c.js';
import { UI_LANGS, type UiLang } from '~/api/lang.js';

export const useDocument = (document: BaseDocument) => {
  // TODO
  const documentTitle = (lang: string): string => {
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

    const locale = getLocaleSmart(lang);

    if (isRoute(document)) {
      return (locale as Unpacked<Route['locales']>).title_prefix + ' : ' + locale.title; // TODO spacing
    }

    return locale.title ?? '';
  };

  const getLocaleStupid = (lang: string) => {
    if (!document.locales) {
      return undefined;
    }

    const { apiLang } = useLang();
    const locale = apiLang(lang as UiLang); // TODO

    for (const result of document.locales) {
      if (result.lang === locale) {
        return result;
      }
    }

    return undefined;
  };

  const getLocaleSmart = (lang: string) => {
    // first of all try to search asked lang
    let result = lang ? getLocaleStupid(lang) : undefined;

    if (result) {
      return result;
    }

    // TODO else, search user lang
    /* result = getLocaleStupid(currentLocale);
    if (result) {
      return result;
    } */

    // else try langs by order // TODO langs
    for (const lang of UI_LANGS) {
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

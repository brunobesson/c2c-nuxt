import type { BaseLocale } from '~/api/c2c.js';
import { API_LANGS, type UiLang } from '~/api/lang.js';
import { useAuthStore } from '~/store/auth.js';

export const useDocumentLocale = () => {
  function getLocaleSmart(document: { locales?: BaseLocale[] }, lang?: UiLang) {
    // first of all try to search asked lang
    let result = lang ? getLocaleStupid(document, lang) : undefined;

    if (result) {
      return result;
    }

    // else, search user lang
    const user = useAuthStore().user;
    if (user) {
      result = getLocaleStupid(document, user.lang);
      if (result) {
        return result;
      }
    }

    // else try langs by order
    for (const lang of API_LANGS) {
      result = getLocaleStupid(document, lang);
      if (result) {
        return result;
      }
    }

    // should never happen
    throw new Error('No matching locale found');
  }

  function getLocaleStupid(document: { locales?: BaseLocale[] }, lang: string) {
    if (!document.locales) {
      return undefined;
    }
    const apiLang = useLang().apiLang(lang);
    for (const result of document.locales) {
      if (result.lang === apiLang) {
        return result;
      }
    }
    return undefined;
  }

  return { getLocaleSmart, getLocaleStupid };
};

import type { Document, DocumentListing } from '~/api/c2c.js';
import { API_LANGS, UiLang } from '~/api/lang.js';
import { useAuthStore } from '~/store/auth.js';
import type { VersionedDocument } from '~/types/common.js';

export const useDocumentLocale = () => {
  function getLocaleSmart<T extends Document | DocumentListing | VersionedDocument>(
    document: T,
    lang?: UiLang,
  ): T['locales'][0] {
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

  function getLocaleStupid(document: Document | DocumentListing | VersionedDocument, lang: string) {
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

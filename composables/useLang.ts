import { API_LANGS, UI_LANGS, type ApiLang, type UiLang } from '~/api/lang.js';

export const useLang = () => {
  function apiLang(uiLang: UiLang): ApiLang | undefined {
    if (isApiLang(uiLang)) {
      return uiLang;
    }
    if (uiLang === 'zh_CN') {
      return 'zh';
    }
    return undefined;
  }

  function isUiLang(lang: string): lang is UiLang {
    return (UI_LANGS as readonly string[]).includes(lang);
  }

  function isApiLang(lang: string): lang is ApiLang {
    return (API_LANGS as readonly string[]).includes(lang);
  }

  return {
    apiLang,
    isUiLang,
    isApiLang,
  };
};

import { API_LANGS, UI_LANGS, type ApiLang, type UiLang } from '~/api/lang.js';

export const useLang = () => {
  function isUiLang(lang: string): lang is UiLang {
    return (UI_LANGS as readonly string[]).includes(lang);
  }

  function isApiLang(lang: string): lang is ApiLang {
    return (API_LANGS as readonly string[]).includes(lang);
  }

  function apiLang(lang: string): ApiLang | undefined {
    if (lang === 'zh_CN') {
      return 'zh';
    }
    return isApiLang(lang) ? lang : undefined;
  }

  function setPrimeUiLang(lang: UiLang) {
    const primeVue = usePrimeVue();
    // TODO useless?
    switch (lang) {
      case 'fr':
        primeVue.config.locale!.accept = 'XXX';
      case 'it':
        primeVue.config.locale!.accept = 'XXX';
      case 'de':
        primeVue.config.locale!.accept = 'XXX';
      case 'en':
        primeVue.config.locale!.accept = 'XXX';
      case 'es':
        primeVue.config.locale!.accept = 'XXX';
      case 'ca':
        primeVue.config.locale!.accept = 'XXX';
      case 'eu':
        primeVue.config.locale!.accept = 'XXX';
      case 'hu':
        primeVue.config.locale!.accept = 'XXX';
      case 'zh_CN':
        primeVue.config.locale!.accept = 'XXX';
      case 'sl':
        primeVue.config.locale!.accept = 'XXX';
    }
  }

  return {
    apiLang,
    isUiLang,
    isApiLang,
    setPrimeUiLang,
  };
};

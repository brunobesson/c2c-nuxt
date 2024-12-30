import dayjs from 'dayjs';
import 'dayjs/locale/ca';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/eu';
import 'dayjs/locale/fr';
import 'dayjs/locale/hu';
import 'dayjs/locale/it';
import 'dayjs/locale/sl';
import 'dayjs/locale/zh-cn';
import type { UiLang } from '~/api/lang.js';

export const useDate = (lang: Ref<UiLang>) => {
  const locales = {
    // TODO factorize
    ca: 'ca',
    es: 'es',
    eu: 'eu',
    de: 'de',
    fr: 'fr',
    hu: 'hu',
    it: 'it',
    sl: 'sl',
    zh_CN: 'zh-cn',
    en: 'en-gb',
  };

  const locale = computed(() => locales[lang.value]);

  const longOutingDateFormat = computed(() => {
    switch (lang.value) {
      case 'ca':
        return 'dddd D MMMM [de] YYYY';
      case 'es':
        return 'dddd D [de] MMMM [de] YYYY';
      case 'eu':
        return 'dddd YYYY[ko] MMMM[ren] D[a]';
      case 'de':
        return 'dddd D. MMMM YYYY';
      case 'fr':
        return 'dddd D MMMM YYYY';
      case 'it':
        return 'dddd D MMMM YYYY';
      case 'hu':
        return 'YYYY. MMMM D., dddd';
      case 'zh_CN':
        return 'YYYY年M月D日dddd';
      case 'sl':
        return 'dddd D. MMMM YYYY';
      case 'en':
      default:
        return 'dddd D MMMM YYYY';
    }
  });

  const longOutingDate = (date: string) => dayjs(date).locale(locale.value).format(longOutingDateFormat.value);

  return {
    longOutingDate,
  };
};

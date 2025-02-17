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
import localizedFormat from 'dayjs/plugin/localizedFormat';
import type { UiLang } from '~/api/lang.js';
import type { IsoDate } from '~/types/common.js';

dayjs.extend(localizedFormat);

export const useDate = (lang: MaybeRef<UiLang>) => {
  const locales = {
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

  const locale = computed(() => locales[unref(lang)]);

  const longOutingDateFormat = computed(() => {
    switch (unref(lang)) {
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

  function longOutingDate(date: IsoDate | undefined = undefined): string {
    return dayjs(date).locale(locale.value).format(longOutingDateFormat.value);
  }

  function outingDates(start: IsoDate | undefined, end: IsoDate | undefined): string | undefined {
    if (!start) {
      return undefined;
    }
    const s = dayjs(start);
    const e = dayjs(end ?? start); // end_date might be undefined for preview

    if (!s.isSame(e, 'year')) {
      return s.locale(locale.value).format('ll') + ' - ' + e.locale(locale.value).format('ll');
    } else if (!s.isSame(e, 'month')) {
      return s.locale(locale.value).format('D MMMM') + ' - ' + e.locale(locale.value).format('ll');
    } else if (!s.isSame(e, 'day')) {
      return s.locale(locale.value).format('D') + ' - ' + e.locale(locale.value).format('ll');
    } else {
      return s.locale(locale.value).format(longOutingDateFormat.value);
    }
  }

  return {
    longOutingDate,
    outingDates,
  };
};

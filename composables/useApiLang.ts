export const useApiLang = () => {
  const apiLang = (locale: string) => {
    if (locale === 'zh_CN') {
      return 'zh';
    } else {
      return locale;
    }
  };

  return {
    apiLang,
  };
};

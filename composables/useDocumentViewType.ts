import type { DocumentType } from '~/api/c2c.js';
import type { ApiLang, UiLang } from '~/api/lang.js';

export const useDocumentViewType = (uiLang: MaybeRef<UiLang>) => {
  const route = useRoute();
  const { apiLang } = useLang();

  const expectedLang: Ref<ApiLang> = useRouteParams('lang', apiLang(unref(uiLang)));

  const documentType = computed((): DocumentType => {
    if (isPrintingView.value) {
      return (route.name as string).split('s-')[0] as DocumentType;
    }
    return (route.name as string).split('-')[0] as DocumentType;
  });

  const isVersionView = computed(() => typeof route.name === 'string' && route.name.endsWith('-version'));

  const isDraftView = computed(
    () => typeof route.name === 'string' && (route.name.endsWith('-edit') || route.name.endsWith('-add')),
  );

  const isPrintingView = computed(() => typeof route.name === 'string' && route.name.endsWith('-print'));

  const isDefaultView = computed(() => !isVersionView.value && !isDraftView.value && !isPrintingView.value);

  return {
    isDefaultView,
    isVersionView,
    isDraftView,
    isPrintingView,
    documentType,
    expectedLang,
  };
};

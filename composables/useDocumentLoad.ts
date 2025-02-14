import QuickLRU from 'quick-lru';
import type { Stringified } from 'type-fest';
import type { Document, DocumentType } from '~/api/c2c.js';
import type { ApiLang, UiLang } from '~/api/lang.js';
import type { MaskedVersionedDocument, VersionedDocument } from '~/types/common.js';

const NOT_MARKDOWN_PROPERTY = new Set([
  'lang',
  'version',
  'title',
  'topic_id',
  // no need to process fields below
  'slope', // route
  'conditions_levels', // outing
  'participants', // outing
]);

// a document can contains around 10 markdown fields and we want to keep two versions of each field plus a small amount
const cache = new QuickLRU({ maxSize: 30 });

const pick = <O>(document: O, ...props: string[]) =>
  props.reduce((doc, prop) => {
    if (document && document.hasOwnProperty(prop as keyof O)) {
      doc[prop as keyof O] = document[prop as keyof O];
    }
    return doc;
  }, {} as O) as Partial<O>;

export const useDocumentLoad = <D extends Document, V extends VersionedDocument | never = never>(
  uiLang: MaybeRef<UiLang>,
  draft?: D,
) => {
  const route = useRoute();
  const { isVersionView, isDraftView, isPrintingView, documentType, expectedLang } = useDocumentViewType(uiLang);

  const documentId = computed(() => {
    if (isDraftView.value || isPrintingView.value) {
      return draft!.document_id;
    }
    return parseInt(route.params.id as string, 10);
  });

  const {
    data: document,
    status,
    error,
  } = useAsyncData(
    async (): Promise<D | V | MaskedVersionedDocument> => {
      if (isVersionView.value) {
        const { document, next_version_id, previous_version_id, version } = await useC2cApi()[
          documentType.value as Exclude<DocumentType, 'map' | 'profile'>
        ].getVersion(documentId.value, route.params.lang as ApiLang, parseInt(route.params.version as string, 10));
        if (document === null) {
          // document may be asked and unavailable
          return {
            version: {
              ...version,
              next_version_id,
              previous_version_id,
            },
          } as MaskedVersionedDocument;
        }
        return {
          ...document,
          version: {
            ...version,
            next_version_id,
            previous_version_id,
          },
        } as V;
      } else if (isDraftView.value || isPrintingView.value) {
        return cookDocument(draft!);
      } else {
        // TODO because of updateUrl(), we may have nothing to do
        // TODO updateHead??
        return useC2cApi()[documentType.value].get(documentId.value, expectedLang.value) as Promise<D>;
      }
    },
    { watch: [route] },
  );

  const cookDocument = async <T extends Document>(draft: T): Promise<T> => {
    const locale = draft.locales[0];
    const missingKeys = Object.keys(locale)
      .filter(k => !NOT_MARKDOWN_PROPERTY.has(k))
      .filter(k => !cache.has(locale[k as keyof typeof locale]));
    if (missingKeys.length === 0) {
      return draft;
    }
    const cooked = await useC2cApi().document.cook(pick(locale, ...missingKeys) as Stringified<Partial<T>>);
    return {
      ...draft,
      ...cooked,
    } as T;
  };

  return { document, status, error };
};

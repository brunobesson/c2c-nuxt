import QuickLRU from 'quick-lru';
import type { Stringified } from 'type-fest';
import type { Document, DocumentType } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';
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

export const useDocumentLoad = <D extends Document, V extends VersionedDocument | never = never>() => {
  const loadDocument = async (
    id: MaybeRef<number>,
    type: MaybeRef<DocumentType>,
    expectedLang: MaybeRef<ApiLang>,
  ): Promise<D> => {
    return useC2cApi()[unref(type)].get(unref(id), unref(expectedLang)) as Promise<D>;
  };

  const loadVersionedDocument = async (
    id: MaybeRef<number>,
    type: MaybeRef<Exclude<DocumentType, 'map' | 'profile'>>,
    lang: MaybeRef<ApiLang>,
    version: MaybeRef<number>,
  ): Promise<V | MaskedVersionedDocument> => {
    const {
      document,
      next_version_id,
      previous_version_id,
      version: v,
    } = await useC2cApi()[unref(type)].getVersion(unref(id), unref(lang), unref(version));
    if (document === null) {
      // document may be asked and unavailable
      return {
        version: {
          ...v,
          next_version_id,
          previous_version_id,
        },
      } as MaskedVersionedDocument;
    }
    return {
      ...document,
      version: {
        ...v,
        next_version_id,
        previous_version_id,
      },
    } as V;
  };

  const cook = async (draft: MaybeRef<D>): Promise<D> => {
    const doc = unref(draft);
    const locale = doc.locales[0];
    const missingKeys = Object.keys(locale)
      .filter(k => !NOT_MARKDOWN_PROPERTY.has(k))
      .filter(k => !cache.has(locale[k as keyof typeof locale]));
    if (missingKeys.length === 0) {
      return doc;
    }
    const cooked = await useC2cApi().document.cook(pick(locale, ...missingKeys) as Stringified<Partial<D>>);
    return {
      ...doc,
      ...cooked,
    } as D;
  };

  return { loadDocument, loadVersionedDocument, cook };
};

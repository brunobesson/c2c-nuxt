import type { ArticleAddInitial, DocumentType } from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';

export const useAssociations = () => {
  const addAssociations = async <D extends ArticleAddInitial>(
    document: MaybeRefOrGetter<D>,
    key: keyof D,
    type: MaybeRefOrGetter<DocumentType>,
    ids: MaybeRefOrGetter<number[]>,
    lang: MaybeRefOrGetter<ApiLang>,
  ): Promise<D> => {
    // TODO: update some properties from parent (geo, etc) (cf code from v7)
    return {
      ...toValue(document),
      [key]: await Promise.all(toValue(ids).map(async id => useDocumentLoad().loadDocument(id, type, lang))),
    };
  };

  return { addAssociations };
};

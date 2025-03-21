import QuickLRU from 'quick-lru';
import type { Stringified } from 'type-fest';
import type {
  Area,
  Article,
  Book,
  Document,
  DocumentType,
  Image,
  Map,
  Outing,
  Profile,
  Route,
  Waypoint,
  Xreport,
} from '~/api/c2c.js';
import type { ApiLang } from '~/api/lang.js';
import type {
  MaskedVersionedDocument,
  VersionedArea,
  VersionedArticle,
  VersionedBook,
  VersionedDocument,
  VersionedImage,
  VersionedOuting,
  VersionedRoute,
  VersionedWaypoint,
  VersionedXreport,
} from '~/types/common.js';

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

export const useDocumentLoad = () => {
  const api = useC2cApi();

  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'area'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Area>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'article'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Article>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'book'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Book>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'image'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Image>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'map'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Map>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'outing'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Outing>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'profile'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Profile>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'route'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Route>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'waypoint'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Waypoint>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'xreport'>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Xreport>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<DocumentType>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Document>;
  function loadDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<DocumentType>,
    expectedLang: MaybeRefOrGetter<ApiLang>,
  ): Promise<Document> {
    return api[toValue(type)].get(toValue(id), toValue(expectedLang));
  }

  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'area'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedArea | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'article'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedArticle | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'book'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedBook | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'image'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedImage | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'outing'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedOuting | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'route'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedRoute | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'waypoint'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedWaypoint | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<'xreport'>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedXreport | MaskedVersionedDocument>;
  function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<Exclude<DocumentType, 'map' | 'profile'>>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedDocument | MaskedVersionedDocument>;
  async function loadVersionedDocument(
    id: MaybeRefOrGetter<number>,
    type: MaybeRefOrGetter<Exclude<DocumentType, 'map' | 'profile'>>,
    lang: MaybeRefOrGetter<ApiLang>,
    version: MaybeRefOrGetter<number>,
  ): Promise<VersionedDocument | MaskedVersionedDocument> {
    const {
      document,
      next_version_id,
      previous_version_id,
      version: v,
    } = await api[toValue(type)].getVersion(toValue(id), toValue(lang), toValue(version));
    const mvdoc: MaskedVersionedDocument = {
      version: {
        ...v,
        next_version_id,
        previous_version_id,
      },
    };
    if (document === null) {
      // document may be masked and unavailable
      return mvdoc;
    }
    return {
      ...document,
      ...mvdoc,
    } as VersionedDocument;
  }

  const cook = async <D extends Document>(draft: MaybeRefOrGetter<D>): Promise<D> => {
    const doc = toValue(draft);
    const locale = doc.locales[0];
    const missingKeys = Object.keys(locale)
      .filter(k => !NOT_MARKDOWN_PROPERTY.has(k))
      .filter(k => !cache.has(locale[k as keyof typeof locale]));
    if (missingKeys.length === 0) {
      return doc;
    }
    const cooked = await api.document.cook(pick(locale, ...missingKeys) as Stringified<Partial<D>>);
    return {
      ...doc,
      ...cooked,
    } as D;
  };

  return { loadDocument, loadVersionedDocument, cook };
};

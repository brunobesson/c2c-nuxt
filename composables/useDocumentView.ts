import type { Article, Document, Image, Outing, Xreport } from '~/api/c2c.js';
import type { UiLang } from '~/api/lang.js';
import { useAuthStore } from '~/store/auth.js';
import { assertNotDocumentVersion, type MaskedVersionedDocument, type VersionedDocument } from '~/types/common.js';

// TODO tout ce qui est lié aux SEO
export const useDocumentView = (
  uiLang: MaybeRef<UiLang>,
  document: MaybeRef<Document | VersionedDocument | MaskedVersionedDocument | null>,
) => {
  const { isModerator, user } = storeToRefs(useAuthStore());
  const { documentType, isDefaultView, isVersionView } = useDocumentViewType(uiLang);
  const doc = unref(document);

  const isDeletable = computed(() => {
    // first of all, if it's not editable, you can't delete it.
    if (!isEditable.value) {
      return false;
    }
    // moderator can delete everything but profiles and areas
    if (isModerator.value && !['profile', 'area'].includes(documentType.value)) {
      return true;
    }
    // note that some code is quite redundant, as isEditable will do most part of the job.
    // But as rules may changes, it's way more safe to explicitly write this rules
    switch (documentType.value) {
      case 'outing':
      case 'xreport':
        return (doc as Outing | Xreport).associations.users.some(u => u.document_id === user.value?.id);
      case 'image':
        return (doc as Image).image_type !== 'collaborative' && (doc as Image).creator.user_id === user.value?.id;
      case 'article':
        return (doc as Article).article_type === 'personal' && (doc as Article).author.user_id === user.value?.id;
      default:
        return false;
    }
  });

  const isEditable = computed(() => {
    // note: we do not check if the user is logged. If he's not, he can login
    if (!isDefaultView.value) {
      return false;
    }
    if (!doc) {
      return false;
    }
    assertNotDocumentVersion(doc);
    if (isModerator.value) {
      return true;
    }
    if (doc.protected) {
      return false;
    }
    switch (documentType.value) {
      case 'route':
      case 'waypoint':
      case 'area':
      case 'book':
      case 'map':
        return true;
      case 'profile':
        return doc.document_id === user.value?.id;
      case 'article': {
        if ((doc as Article).article_type === 'collab') {
          return true;
        }
        return (doc as Article).author.user_id === user.value?.id;
      }
      case 'xreport': {
        if ((doc as Xreport).author.user_id === user.value?.id) {
          return true;
        }
        return (doc as Xreport).associations.users.some(u => u.document_id === user.value?.id);
      }
      case 'outing':
        return (doc as Outing).associations.users.some(u => u.document_id === user.value?.id);
      case 'image':
        return (doc as Image).image_type === 'collaborative';
    }
  });

  const version = computed(() =>
    !isVersionView.value ? undefined : (doc as MaskedVersionedDocument | VersionedDocument | null)?.version,
  );

  const locale = computed(() => (isVersionView ? undefined : (doc as Document | null)?.cooked));

  const lang = computed(() => (isVersionView ? undefined : (doc as Document | null)?.cooked?.lang));

  return {
    isEditable,
    isDeletable,
    version,
    locale,
    lang,
  };
};

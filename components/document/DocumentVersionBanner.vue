<template>
  <Message
    severity="warn"
    :pt="{
      text: 'w-full text-center',
    }">
    <p>
      <i18n-t keypath="version.archived">
        {{ format(document.version.written_at, 'LLLL') }}
      </i18n-t>
    </p>
    <p v-if="isMaskedVersionedDocument(document)">{{ $t('version.masked') }}</p>
    <span v-if="!firstVersion">
      (<LinkDocumentDiff
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version-from="version!.previous_version_id!"
        :version-to="currentVersion" />)
      <LinkDocumentVersion
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version="version!.previous_version_id!">
        ← {{ $t('version.previous') }}
      </LinkDocumentVersion>
    </span>
    <span v-else>{{ $t('version.first') }}</span>
    <template v-if="!isMaskedVersionedDocument(document)">
      |
      <LinkDocument :document="document" :lang="lang">{{ $t('version.current') }}</LinkDocument>
      (<LinkDocumentDiff
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version-from="currentVersion"
        version-to="last" />)
    </template>
    <span v-if="!lastVersion">
      |
      <LinkDocumentVersion
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version="version!.next_version_id!">
        {{ $t('version.next') }} →
      </LinkDocumentVersion>
      (<LinkDocumentDiff
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version-from="currentVersion"
        :version-to="version!.previous_version_id!" />)
    </span>
    <span v-else>{{ $t('version.last') }}</span>

    <p>
      <i18n-t v-if="document.version.comment" keypath="colon" scope="global">
        <template #before>
          <NuxtLink :to="{ name: 'profile', params: { id: document.version.user_id } }">
            <IconDocument type="profile" />&nbsp;<LinkContributor :contributor="document.version" />
          </NuxtLink>
        </template>
        <template #after>
          <em>{{ document.version.comment }}</em>
        </template>
      </i18n-t>
      <NuxtLink v-else :to="{ name: 'profile', params: { id: document.version.user_id } }">
        <IconDocument type="profile" />&nbsp;<LinkContributor :contributor="document.version" />
      </NuxtLink>
    </p>
    <p v-if="isModerator">
      <!-- TODO styling + open confirmation dialog -->
      <button v-if="!lastVersion">
        {{ $t('version.restore') }}
      </button>
    </p>
  </Message>
</template>

<script setup lang="ts">
import type { ApiLang } from '../../api/lang.js';
import { useAuthStore } from '../../store/auth.js';
import { isMaskedVersionedDocument, type MaskedVersionedDocument, type VersionedDocument } from '../../types/common.js';

const { document } = defineProps<{ document: MaskedVersionedDocument | VersionedDocument }>();

const { locale } = useI18n();
const { format } = useDate(locale);
const { documentType } = useDocumentViewType(locale);
const { version } = useDocumentView(locale, document);
const { isModerator } = useAuthStore();

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams('lang') as Ref<ApiLang>;
const currentVersion = useRouteParams('version', 0, { transform: Number });
const firstVersion = computed(() => !version.value?.previous_version_id);
const lastVersion = computed(() => !version.value?.next_version_id);
</script>

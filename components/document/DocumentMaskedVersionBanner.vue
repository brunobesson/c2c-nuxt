<template>
  <Message severity="warn" class="text-center">
    <p>{{ $t('version.warn-masked') }}</p>
    <span v-if="!firstVersion">
      <LinkDocumentVersion
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version="version!.previous_version_id!">
        ← {{ $t('version.previous') }}
      </LinkDocumentVersion>
    </span>
    <span v-else>{{ $t('version.first') }}</span>
    |
    <span v-if="!lastVersion">
      <LinkDocumentVersion
        :document-type="documentType"
        :id="documentId"
        :lang="lang"
        :version="version!.next_version_id!">
        {{ $t('version.next') }} →
      </LinkDocumentVersion>
    </span>
    <span v-else>{{ $t('version.last') }}</span>
  </Message>
</template>

<script setup lang="ts">
import type { ApiLang } from '~/api/lang.js';
import type { MaskedVersionedDocument } from '~/types/common.js';

const { document } = defineProps<{ document: MaskedVersionedDocument }>();

const route = useRoute();
const { locale } = useI18n();
const { documentType } = useDocumentViewType(locale);
const { version } = useDocumentView(locale, document);

const documentId = useRouteParams('id', 0, { transform: Number });
const lang = useRouteParams('lang') as Ref<ApiLang>;
const firstVersion = computed(() => !version.value?.previous_version_id);
const lastVersion = computed(() => !version.value?.next_version_id);
</script>

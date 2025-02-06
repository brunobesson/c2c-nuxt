<template>
  <div class="hidden print:flex print:justify-between">
    <div class="text-gray-500 italic">
      <p>{{ license }}</p>
      <p v-if="document.type !== 'i'">{{ $t('license.image') }}</p>
      <!-- Until we can reference the document version -->
      <i18n-t keypath="license.version" tag="p" class="mt-2" scope="global">
        {{ longOutingDate() }}
      </i18n-t>
    </div>
    <img src="~/assets/img/logo.svg" class="h-[70px]" />
    <div v-html="qrcode" class="w-[70px]" />
  </div>
</template>

<script setup lang="ts">
import { renderSVG } from 'uqr';
import type { Document } from '~/api/c2c.js';
import type { VersionedDocument } from '~/types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument }>();

const { t, locale } = useI18n();
const { documentLicense } = useDocument(document);
const { longOutingDate } = useDate(locale);

const qrcode = computed(() => {
  const shortURL = location.href.substring(0, location.href.lastIndexOf('/'));
  return renderSVG(shortURL);
});

const license = computed(() => {
  switch (documentLicense.value) {
    case 'by-sa':
      return t('license.by-sa');
    case 'by-nc-nd':
      return t('license.by-nc-nd');
    case 'copyright':
      return t('license.copyright');
  }
});
</script>

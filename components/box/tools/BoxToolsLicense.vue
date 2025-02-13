<template>
  <div class="text-center">
    <NuxtLink
      v-if="license === 'by-sa'"
      :href="`https://creativecommons.org/licenses/by-sa/3.0/deed.${locale}`"
      target="_blank"
      class="link">
      <IconCreativeCommons />
      CC <span :title="$t('license.by')">BY</span> <span :title="$t('license.sa')">SA</span> 3.0
      <br />
      {{ $t('license.by-sa') }}
    </NuxtLink>
    <NuxtLink
      v-else-if="license === 'by-nc-nd'"
      :href="`https://creativecommons.org/licenses/by-nc-nd/3.0/deed.${locale}`"
      target="_blank"
      class="link">
      <IconCreativeCommons />
      CC <span :title="$t('license.by')">BY</span> <span :title="$t('license.nc')">NC</span>
      <span :title="$t('license.nd')">ND</span> 3.0
      <br />
      {{ $t('license.by-nc-nd') }}
    </NuxtLink>
    <span v-else :title="$t('license.copyright-descr')"> <Icon icon="ban" /> {{ $t('license.copyright') }} </span>
  </div>
</template>

<script setup lang="ts">
import type { Document } from '~/api/c2c.js';
import type { VersionedDocument } from '~/types/common.js';

const { document } = defineProps<{ document: Document | VersionedDocument }>();
const { documentLicense: license } = useDocument(document);
const { locale } = useI18n();
</script>

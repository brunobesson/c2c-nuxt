<template>
  <div>
    <h1>
      <IconEdit />
      <template v-if="isEdit(document)">
        <DocumentTitle :document="document" />
        ({{ langDescr }})
      </template>
      <template v-else>
        {{ $t(`edit.title.add.${docType}`) }}
        <DropdownMenu :items="apiLocales">
          <template #trigger>
            <Button type="button" severity="secondary" variant="outlined"> {{ langDescr }} + </Button>
          </template>
          <template #item="{ item }">
            <a
              :key="item.code"
              class="w-full block"
              :class="{ 'bg-[--p-menu-item-focus-background]': item.code === lang }"
              @click="setLang(item.code)">
              {{ item.name }}
            </a>
          </template>
        </DropdownMenu>

        <Button>
          <!-- TODO preview -->
          <Icon icon="eye" /> {{ $t('edit.preview-mode') }}
        </Button>
      </template>
    </h1>

    <slot />

    <!-- TODO save -->
    <div class="">
      <!-- TODO loading -->
      <Button :loading="saving" @click="save()">
        {{ $t('edit.save') }}
      </Button>
      <Button>
        <!-- TODO preview -->
        <Icon icon="eye" /> {{ $t('edit.preview-mode') }}
      </Button>
      <InputText type="text" :placeholder="$t('edit.comment')" />
    </div>

    <!-- TODO banners -->
  </div>
</template>

<script setup lang="ts">
import type { ArticleFormAddInitial, ArticleFormEdit } from '~/api/c2c.js';
import { type ApiLang } from '~/api/lang.js';

const isEdit = (document: ArticleFormEdit | ArticleFormAddInitial): document is ArticleFormEdit =>
  'document_id' in document;

const { document } = defineProps<{ document: ArticleFormEdit | ArticleFormAddInitial }>();

const { t, locales } = useI18n();
const edit = computed(() => isEdit(document));

const lang = useRouteParams<ApiLang>('lang');
const langDescr = computed(() => locales.value.find(({ code }) => code === lang.value)?.name);
const apiLocales = computed(() => locales.value.filter(({ code }) => useLang().isApiLang(code)));

const setLang = (newLang: ApiLang) => {
  lang.value = newLang;
};

const docType = computed(() => documentType(document.type));

useHead({
  title: t(edit.value ? 'edit.title.edit' : `edit.title.add.${docType.value}`),
});

const saving = ref(false);
const api = useC2cApi();
const save = async () => {
  saving.value = true;
  // TODO
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (edit) {
    // api[docType.value].save();
  } else {
    // api[docType.value].create();
  }
  saving.value = false;
};
</script>

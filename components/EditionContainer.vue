<template>
  <div>
    <h1>
      <IconEdit />
      <template v-if="isEdit(document)">
        <DocumentTitle :document />
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

    <form @submit="save" class="flex flex-col">
      <slot />

      <!-- TODO save -->
      <div class="">
        <!-- TODO loading -->
        <Button type="submit" :loading="isSubmitting" :disabled="isSubmitting">
          {{ $t('edit.save') }}
        </Button>
        <Button type="button">
          <!-- TODO preview -->
          <Icon icon="eye" /> {{ $t('edit.preview-mode') }}
        </Button>
        <InputText type="text" :placeholder="$t('edit.comment')" />
      </div>

      {{ values }}
      - {{ errors }}
    </form>

    <ConfirmDialog />
    <!-- TODO banners -->
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot';
import type { ErrorMessage, ObjectEntries, StrictObjectIssue, StrictObjectSchema } from 'valibot';
import type { DocumentFormAddInitial, DocumentFormEdit } from '~/api/c2c.js';
import { type ApiLang } from '~/api/lang.js';

const isEdit = (document: DocumentFormEdit | DocumentFormAddInitial): document is DocumentFormEdit =>
  'document_id' in document;

const { document, schema } = defineProps<{
  document: DocumentFormEdit | DocumentFormAddInitial;
  schema: StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined>;
}>();

const { t, locales } = useI18n();
const edit = computed(() => isEdit(document));

const lang = ref(useRoute().params.lang as ApiLang);
const langDescr = computed(() => locales.value.find(({ code }) => code === lang.value)?.name);
const apiLocales = computed(() => locales.value.filter(({ code }) => useLang().isApiLang(code)));

const { path } = useRoute();
const setLang = (newLang: ApiLang) => {
  window.history.replaceState({}, '', path.substring(0, path.lastIndexOf('/') + 1) + newLang);
  lang.value = newLang;
};

const docType = computed(() => documentType(document.type));

useHead({
  title: t(edit.value ? 'edit.title.edit' : `edit.title.add.${docType.value}`),
});

const { handleSubmit, isSubmitting, values, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
});
watch(
  () => document,
  () => resetForm({ values: { document_id: undefined, ...document } }),
  { immediate: true },
);

const api = useC2cApi();
const save = handleSubmit(
  values =>
    new Promise(resolve => {
      setTimeout(() => {
        // TODO use correct lang
        if (edit) {
          // api[docType.value].save();
        } else {
          // api[docType.value].create();
        }
        alert(JSON.stringify(values, null, 2));
        resolve(undefined);
      }, 1000);
    }),
  ({ errors }) => {
    const firstError = Object.keys(errors)[0];
    const el = globalThis.document.querySelector(`label[for="${firstError}"]`);
    el?.scrollIntoView({ behavior: 'smooth' });
    console.log(firstError);
  },
);

const confirm = useConfirm();
onBeforeRouteLeave((_to, _from, next) => {
  if (meta.value.dirty) {
    confirm.require({
      message: t('edit.quit.message'),
      header: t('edit.quit.title'),
      rejectProps: {
        label: t('edit.quit.cancel'),
        severity: 'secondary',
      },
      acceptProps: {
        label: t('edi.quit.confirm'),
      },
      accept: () => next(),
      reject: () => next(false),
    });
  } else {
    next();
  }
});

onBeforeMount(() => window.addEventListener('beforeunload', beforeUnload));

onBeforeUnmount(() => window.removeEventListener('beforeunload', beforeUnload));

const beforeUnload = (event: Event) => {
  if (meta.value.dirty) {
    event.preventDefault();
  }
};
</script>

<template>
  <FormLabel :field :label :errorMessage />
  <div>
    <div>
      <FormMarkdownButton
        icon="bold"
        :disabled="preview"
        @click="handleStrong"
        :tooltip="$t('markdown.editor.strong')" />
      <FormMarkdownButton
        icon="italic"
        :disabled="preview"
        @click="handleItalic"
        :tooltip="$t('markdown.editor.italic')" />
      <FormMarkdownButton
        icon="heading"
        :disabled="preview"
        @click="handleHeading"
        :tooltip="$t('markdown.editor.heading')" />

      <FormMarkdownButton
        icon="image"
        :disabled="preview"
        @click="handleImage"
        :tooltip="$t('markdown.editor.image')" />
      <FormMarkdownButton icon="link" :disabled="preview" @click="handleLink" :tooltip="$t('markdown.editor.link')" />
      <FormMarkdownButton icon="grin" :disabled="preview" @click="handleEmoji" :tooltip="$t('markdown.editor.emoji')" />

      <FormMarkdownButton
        icon="hashtag"
        :disabled="preview"
        @click="handleHashtag"
        :tooltip="$t('markdown.editor.hashtag')" />
      <FormMarkdownButton icon="list-ul" :disabled="preview" @click="handleUl" :tooltip="$t('markdown.editor.ul')" />
      <FormMarkdownButton icon="list-ol" :disabled="preview" @click="handleOl" :tooltip="$t('markdown.editor.ol')" />
      <FormMarkdownButton icon="code" :disabled="preview" @click="handleCode" :tooltip="$t('markdown.editor.code')" />
      <FormMarkdownButton
        icon="comment"
        :disabled="preview"
        @click="handleQuote"
        :tooltip="$t('markdown.editor.quote')" />

      <FormMarkdownButton
        :icon="preview ? 'code' : 'eye'"
        @click="preview = !preview"
        :text="preview ? $t('markdown.editor.preview.off') : $t('markdown.editor.preview.on')" />

      <FormMarkdownButton
        icon="question-circle"
        :tooltip="$t('markdown.editor.help')"
        href="https://www.camptocamp.org/articles/151910" />
      <FormMarkdownButton
        :icon="fullscreen ? 'compress' : 'expand'"
        :tooltip="fullscreen ? $t('markdown.editor.fullscreen.off') : $t('markdown.editor.fullscreen.on')"
        @click="fullscreen = !fullscreen" />
    </div>
    <div>
      <textarea ref="text" :placeholder @focus="focus = true" @blur="focus = false" v-model="value" />
      <Markdown v-if="preview && cooked" :content="cooked" />
      <!-- TODO if preview error styling -->
      <div v-if="preview && !cooked">
        {{ $t('markdown.editor.error') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { field } = defineProps<{ field: string; label?: string; placeholder?: string }>();

const { t } = useI18n();

const { value, errorMessage, handleChange } = useField<string>(() => field);

const fullscreen = ref(false); // TODO css
const focus = ref(false);
const cooked = ref<string | null>(null);

const preview = ref(false);
const api = useC2cApi();
watch(preview, async () => {
  if (!preview) {
    cooked.value = null;
    return;
  }
  try {
    cooked.value = `<em>${t('markdown.editor.loading')}</em>`;
    cooked.value = (await api.document.cook({ value: value.value })).value;
  } catch (error: unknown) {
    cooked.value = null;
  }
});

const textarea = useTemplateRef('text');
let selection: Selection;
onMounted(() => {
  selection = new Selection(textarea.value!, handleChange);
});

const handleStrong = () => {
  handleSimpleMarkdownTag('**', t('markdown.editor.strong'));
};

const handleItalic = () => {
  handleSimpleMarkdownTag('_', t('markdown.editor.italic'));
};

const handleHeading = () => {
  selection.expandToEntireLine();
  if (selection.text.startsWith('#')) {
    selection.replace(/^#+ */, '');
  } else {
    const chunk = selection.empty ? t('markdown.editor.heading') : selection.text;
    selection.setText(chunk, '## ');
  }
  textarea.value?.focus();
};

const handleImage = () => {
  selection.set(selection.start, selection.start);
  selection.setText('IMAGE_ID', '\n\n[img=', ' right]Legend[/img]\n\n');
  textarea.value?.focus();
};

const handleLink = () => {
  // TODO
};

const handleEmoji = () => {
  selection.set(selection.start, selection.start);
  selection.setText('smile', ':', ':');
  textarea.value?.focus();
};

const handleHashtag = () => {
  selection.expandToEntireLine();
  if (selection.empty) {
    selection.setText(
      'L# | cotation | length | description\nL# | cotation | length | description\nL# | cotation | length | description',
    );
    selection.set(selection.start + 5);
  } else {
    selection.addLinePrefix('L# | ');
  }
  textarea.value?.focus();
};

const handleUl = () => {
  handleBlockMarkdownTag('* ', '* item 1\n* item 2\n* item 3');
};

const handleOl = () => {
  handleBlockMarkdownTag('1. ', '1. item 1\n2. item 2\n3. item 3');
};

const handleCode = () => {
  if (selection.text.includes('\n')) {
    handleBlockMarkdownTag('    ');
  } else {
    // inline code mode
    handleSimpleMarkdownTag('`', t('markdown.editor.code'));
  }
};

const handleQuote = () => {
  handleBlockMarkdownTag('> ', '> Citation');
};

const handleSimpleMarkdownTag = (tag: string, defaultChunk: string) => {
  const tagLength = tag.length;
  if (selection.isSurroundedBy(tag, tag)) {
    // remove tag
    const chunk = selection.text;
    selection.set(selection.start - tagLength, selection.end + tagLength);
    selection.setText(chunk);
  } else {
    // add tag
    const chunk = selection.empty ? defaultChunk : selection.text;
    selection.setText(chunk, tag, tag);
    textarea.value?.focus();
  }
};

const handleBlockMarkdownTag = (tag: string, defaultChunk = '') => {
  selection.expandToEntireLine();
  if (selection.empty) {
    selection.setText(defaultChunk);
    selection.set(selection.start + tag.length);
  } else if (selection.linesStartsWith(tag)) {
    selection.removeLinePrefix(tag);
    selection.set(selection.start);
  } else {
    selection.addLinePrefix(tag);
    selection.set(selection.start + tag.length);
  }
  textarea.value?.focus();
};

class Selection {
  constructor(
    private readonly textarea: HTMLTextAreaElement,
    private readonly handleChange: (evt: Event | any) => void,
  ) {}

  get start() {
    return this.textarea.selectionStart;
  }

  set start(value: number) {
    this.textarea.selectionStart = value;
  }

  get end() {
    return this.textarea.selectionEnd;
  }

  set end(value: number) {
    this.textarea.selectionEnd = value;
  }

  get length() {
    return this.end - this.start;
  }

  get text() {
    return this.textarea.value.substr(this.start, this.length);
  }

  get empty() {
    return this.start === this.end;
  }

  set(start: number, end?: number) {
    this.start = start;
    this.end = end ?? start;
  }

  setText(text: string, before = '', after = '') {
    const chunk = before + text + after;

    const start = this.start;
    this.textarea.value =
      this.textarea.value.substring(0, this.start) + chunk + this.textarea.value.substring(this.end);
    this.set(start + before.length, start + before.length + text.length);
    this.handleChange(this.textarea.value);
  }

  replace(pattern: RegExp, replacement: string) {
    this.setText(this.text.replace(pattern, replacement));
  }

  isSurroundedBy(before: string, after: string) {
    const beforeLength = before.length;
    const afterLength = after.length;
    const content = this.textarea.value;
    return (
      content.substring(this.start - beforeLength, this.start) === before &&
      content.substring(this.end, this.end + afterLength) === after
    );
  }

  expandToEntireLine() {
    const start = this.textarea.value.lastIndexOf('\n', this.start);
    this.start = start + 1;
    const end = this.textarea.value.indexOf('\n', this.end);
    this.end = end === -1 ? this.textarea.value.length : end;
  }

  linesStartsWith(tag: string) {
    for (const line of this.text.split('\n')) {
      if (!line.startsWith(tag)) {
        return false;
      }
    }
    return true;
  }

  removeLinePrefix(tag: string) {
    this.setText(
      this.text
        .split('\n')
        .map(line => line.substr(tag.length)) // TODO
        .join('\n'),
    );
  }

  addLinePrefix(tag: string) {
    this.setText(
      this.text
        .split('\n')
        .map(line => tag + line)
        .join('\n'),
    );
  }
}
</script>

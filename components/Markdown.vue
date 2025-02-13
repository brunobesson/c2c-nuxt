<template>
  <!--TODO styling-->
  <div v-html="html" :class="{ italic: isSummary, hidden: !content }" />
</template>

<script setup lang="ts">
import { icon, type IconName, type IconPrefix } from '@fortawesome/fontawesome-svg-core';

const { content, isSummary = false } = defineProps<{ content: string | null; isSummary?: boolean }>();

const { locale } = useI18n();
const router = useRouter();
const config = useRuntimeConfig();

type Processor = {
  parse(content: string): Document | HTMLElement;
  serialize(doc: Document | HTMLElement): string;
};

let processor: (content: string) => string;
if (import.meta.client) {
  processor = content => {
    const el = document.createElement('div');
    el.innerHTML = content;
    process(el);
    return el.innerHTML;
  };
} else {
  const { JSDOM } = await import('jsdom');
  processor = content => {
    const jsdom = new JSDOM(content);
    process(jsdom.window.document);
    return jsdom.serialize();
  };
}

const html = computed(() => {
  if (content === null) {
    return undefined;
  }
  return processor(content);
});

const process = (doc: Document | HTMLElement) => {
  if (content!.includes('c2c:role')) {
    computeFigures(doc.querySelectorAll('figure[c2c\\:role=embedded-figure]'));
    computeImages(doc.querySelectorAll('img[c2c\\:role=embedded-image]'));
    computeEmojis(doc.querySelectorAll('img[c2c\\:role=emoji]'));
    computeAnchors(doc.querySelectorAll('a[c2c\\:role=internal-link]'));
    computeVideos(doc.querySelectorAll('div[c2c\\:role=video] > iframe'));

    addClasses(doc, 'div[c2c\\:role=info]', 'notification', 'is-info'); // TODO!
    addClasses(doc, 'div[c2c\\:role=warning]', 'notification', 'is-warning');
    addClasses(doc, 'div[c2c\\:role=danger]', 'notification', 'is-danger');
    addClasses(doc, 'div[c2c\\:role=video]', 'no-print');
    addClasses(doc, 'table[c2c\\:role=ltag]', 'table');
  }
};

const addClasses = (doc: Document | HTMLElement, cssSelector: string, ...classes: string[]) => {
  const nodes = doc.querySelectorAll(cssSelector);
  for (const node of nodes) {
    node.classList.add(...classes);
  }
};

const getFontAwesomeSrc = (prefix: IconPrefix, iconName: IconName) => {
  let svgSource = icon({ prefix, iconName }).html[0];
  svgSource = svgSource.replace('fill="currentColor"', 'fill="#F93"');
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgSource);
};

const getEmojiSrc = (emojiSource: 'emojione' | 'c2c-activities' | 'c2c-waypoints', svgName: string) => {
  switch (emojiSource) {
    case 'emojione':
      return `https://cdn.jsdelivr.net/emojione/assets/svg/${svgName}.svg`;
    case 'c2c-activities':
      return getFontAwesomeSrc('activity' as IconPrefix, svgName as IconName);
    case 'c2c-waypoints':
      return getFontAwesomeSrc('waypoint' as IconPrefix, svgName as IconName);
  }
};

const computeVideos = (iframes: NodeListOf<HTMLIFrameElement>) => {
  for (const iframe of iframes) {
    iframe.setAttribute('allowfullscreen', 'true');
  }
};

const computeEmojis = (emojis: NodeListOf<HTMLImageElement>) => {
  for (const emoji of emojis) {
    const emojiSource = emoji.attributes.getNamedItem('c2c:emoji-db')!.value;
    const svgName = emoji.attributes.getNamedItem('c2c:svg-name')!.value;
    emoji.src = getEmojiSrc(emojiSource as 'emojione' | 'c2c-activities' | 'c2c-waypoints', svgName)!;
  }
};

const computeFigures = (figures: NodeListOf<HTMLElement>) => {
  for (const figure of figures) {
    const image = figure.children[0];
    const size = image.attributes.getNamedItem('c2c:size');

    if (size) {
      figure.setAttribute('c2c:size', size.value);
    }
  }
};

const computeImages = (images: NodeListOf<HTMLImageElement>) => {
  for (const image of images) {
    const document_id = parseInt(image.attributes.getNamedItem('c2c:document-id')!.value, 10);
    image.dataset.c2cExtrapoledDocument = JSON.stringify({
      document_id,
      locales: [{ title: '...' }],
      available_langs: [locale.value],
      type: 'i',
    });

    image.src = config.public.c2cApiBase.slice(0, -1) + image.attributes.getNamedItem('c2c:url-proxy')!.value;
    image.addEventListener('click', () => {
      // TODO this.$imageViewer.show(JSON.parse(image.dataset.c2cExtrapoledDocument));
    });

    const parent = image.parentNode!;
    const picture = document.createElement('picture');

    // Until all images are migrated only images uploaded after a given timestamp
    // or with an id greater than a given one have their webp and avif versions
    if (config.public.modernThumbnailsId && document_id > config.public.modernThumbnailsId) {
      const avif = document.createElement('source');
      avif.setAttribute('type', 'image/avif');
      avif.setAttribute(
        'srcset',
        config.public.c2cApiBase.slice(0, -1) +
          image.attributes.getNamedItem('c2c:url-proxy')!.value +
          '&extension=avif',
      );
      const webp = document.createElement('source');
      webp.setAttribute('type', 'image/webp');
      webp.setAttribute(
        'srcset',
        config.public.c2cApiBase.slice(0, -1) +
          image.attributes.getNamedItem('c2c:url-proxy')!.value +
          '&extension=webp',
      );
      picture.appendChild(avif);
      picture.appendChild(webp);
    }
    picture.appendChild(image);
    parent.appendChild(picture);

    // TODO this.$imageViewer.push(image.c2cExtrapoledDocument);
  }
};

const computeAnchors = (anchors: NodeListOf<HTMLAnchorElement>) => {
  for (const anchor of anchors) {
    const attributes = anchor.attributes;

    const { href } = router.resolve({
      name: attributes.getNamedItem('c2c:document-type')!.value.slice(0, -1),
      params: {
        id: parseInt(attributes.getNamedItem('c2c:document-id')!.value, 10),
        lang: attributes.getNamedItem('c2c:lang')?.value ?? undefined,
        title: attributes.getNamedItem('c2c:slug')?.value ?? undefined,
      },
      hash: attributes.getNamedItem('c2c:anchor') ? '#' + attributes.getNamedItem('c2c:anchor')!.value : undefined,
    });

    anchor.href = href;
    anchor.addEventListener('click', e => {
      if (guardEvent(e)) {
        router.push(href); // TODO check working
      }
    });
  }
};

// copied from vue router : https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
const guardEvent = (e: MouseEvent) => {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return;
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) return;
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget instanceof Element) {
    const target = (e.currentTarget as Element).getAttribute('target');
    if (/\b_blank\b/i.test(target ?? '')) return;
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
};
</script>

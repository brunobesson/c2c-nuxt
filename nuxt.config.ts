import fs from 'node:fs/promises';
import { parseStringPromise } from 'xml2js';
import capitalize from './utils/capitalize.js';

const fileRegex = /.*\/assets\/font-awesome-custom\/([^\/]+)\/(.+)\.svg\?icon$/;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },

  css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/css/tailwind.css', '@/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  primevue: {
    options: {
      theme: 'none',
    },
    autoImport: true,
  },

  vite: {
    plugins: [
      {
        name: 'svg-import',
        transform: async (_code: string, id: string) => {
          const match = id.match(fileRegex);
          if (!match) {
            return null;
          }
          const content = await fs.readFile(id.substring(0, id.length - 5));
          const { svg } = await parseStringPromise(content);
          return {
            code:
              'export default ' +
              JSON.stringify({
                prefix: match[1],
                iconName: match[2],
                icon: [svg.$.width, svg.$.height, [], '', svg.path[0].$.d],
              }),
            map: { mappings: '' as const },
          };
        },
      },
    ],
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    baseUrl: 'https://www.camptocamp.org',
    locales: [
      { code: 'ca', language: 'ca', file: 'ca.json', name: 'Català' },
      { code: 'de', language: 'de', file: 'de.json', name: 'Deutsch' },
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'es', language: 'es', file: 'es.json', name: 'Español' },
      { code: 'eu', language: 'eu', file: 'eu.json', name: 'Euskara' },
      { code: 'fr', language: 'fr', file: 'fr.json', name: 'Français' },
      { code: 'hu', language: 'hu', file: 'hu.json', name: 'Magyar' },
      { code: 'it', language: 'it', file: 'it.json', name: 'Italiano' },
      { code: 'sl', language: 'sl', file: 'sl.json', name: 'Slovenščina' },
      {
        code: 'zh_CN',
        language: 'zh-CN',
        file: 'zh_CN.json',
        name: '简体中文',
      },
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    lazy: true,
    bundle: {
      runtimeOnly: true,
    },
  },

  hooks: {
    'pages:extend'(pages) {
      ['area', 'article', 'book', 'image', 'map', 'outing', 'profile', 'route', 'waypoint', 'xreport'].forEach(
        docType => {
          pages.push(
            // list
            { path: `/${docType}s`, name: `${docType}s`, file: '~/components/pages/Documents.vue' },
            // print
            {
              path: `/${docType}s/print`,
              name: `${docType}s-print`,
              file: '~/components/pages/DocumentsPrinting.vue',
            },
            // view
            {
              path: `/${docType}s/:id(\\d+)/:lang?/:slug?`,
              name: docType,
              file: `~/components/pages/${capitalize(docType)}.vue`,
            },

            // history
            {
              path: `/${docType}s/history/:id(\\d+)/:lang`,
              name: `${docType}-history`,
              file: '~/components/pages/History.vue',
            },
            // edit
            {
              path: `/${docType}s/edit/:id(\\d+)/:lang`,
              name: `${docType}-edit`,
              file: `~/components/pages/${capitalize(docType)}Edition.vue`,
            },
            // create
            {
              path: `/${docType}s/add/:lang`,
              name: `${docType}-add`,
              file: `~/components/pages/${capitalize(docType)}Edition.vue`,
            },
            // diff
            {
              path: `/${docType}s/diff/:id(\\d+)/:lang/:versionFrom(\\d+)/:versionTo(\\d+)`,
              name: `${docType}-diff`,
              file: '~/components/pages/Diff.vue',
            },
          );
          if (docType !== 'profile') {
            pages.push(
              // version
              {
                path: `/${docType}s/version/:id(\\d+)/:lang/:version(\\d+)`,
                name: `${docType}-version`,
                file: `~/components/pages/${capitalize(docType)}.vue`,
              },
            );
          }
        },
      );
    },
  },

  routeRules: {
    '/topoguide': { prerender: true },
    '/serac': { prerender: true },
  },

  runtimeConfig: {
    public: {
      c2cApiBase: 'https://api.camptocamp.org/',
      forumBase: 'https://forum.camptocamp.org/',
      imagesBase: 'https://images.camptocamp.org/',
      apiEmailAlertsBase: 'https://brunobesson-c2capiemailalerts.web.val.run',
      modernThumbnailsTimestamp: 0,
      modernThumbnailsId: 0,
    },
    apiEmailAlertsToken: '', // must be overridden by NUXT_API_EMAIL_ALERTS_TOKEN environment variable
  },
});

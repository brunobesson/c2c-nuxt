import fs from 'node:fs/promises';
import { parseStringPromise } from 'xml2js';

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

  routeRules: {
    '/topoguide': { prerender: true },
    '/serac': { prerender: true },
  },

  runtimeConfig: {
    public: {
      c2cApiBase: 'https://api.camptocamp.org/',
      forumBase: 'https://forum.camptocamp.org/',
    },
  },
});

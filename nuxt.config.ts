// https://nuxt.com/docs/api/configuration/nuxt-config

import fs from 'node:fs/promises';
import { parseStringPromise } from 'xml2js';

const fileRegex = /.*\/assets\/font-awesome-custom\/([^\/]+)\/(.+)\.svg$/;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/google-fonts'],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.scss',
  ],

  vite: {
    plugins: [
      {
        name: 'svg-import',
        transform: async (_code: string, id: string) => {
          const match = id.match(fileRegex);
          if (!match) {
            return null;
          }
          const content = await fs.readFile(id);
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
@use "~/assets/css/_variables.scss" as *;
// Override global Sass variables from the /utilities folder
@use 'bulma/sass/utilities' as bulma with (
  $green: #4baf50,
  $primary: $color-complementary-c2c,
  $link: $color-link,
  // 30/14
  $size-1: 2.1429rem,
  // 26/14
  $size-2: 1.8571rem,
  // 22/14
  $size-3: 1.5714rem,
  // 18/14
  $size-4: 1.2857rem,
  // 16/14
  $size-5: 1.1429rem,
  // $size-6 : 1 rem,
  // 12/14
  $size-7: 0.7857rem
);
@use 'bulma/sass/utilities/mixins' as mixins;`,
          // bulma deprecation warnings
          silenceDeprecations: [
            'legacy-js-api',
            'color-functions',
            'import',
            'global-builtin',
          ],
        },
      },
    },
  },

  googleFonts: {
    families: {
      Inter: true,
    },
  },
});

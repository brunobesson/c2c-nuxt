// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.scss',
  ],
  vite: {
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
});

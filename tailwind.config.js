/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        nav: '0 2px 0 #f93', // TODO color-base-c2c
      },
    },
    screens: {
      mobile: '768px',
      tablet: '1024px',
      desktop: '1216px',
      widescreen: '1408px',
    },
  },
  plugins: [require('tailwindcss-primeui')],
};

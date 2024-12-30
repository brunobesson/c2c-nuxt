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
  darkMode: 'selector',
  theme: {
    screens: {
      mobile: '768px',
      tablet: '1024px',
      desktop: '1216px',
      widescreen: '1408px',
    },
    fontFamily: {
      sans: [
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: ['Inconsolata', 'Hack', 'SF Mono', 'Roboto Mono', 'Source Code Pro', 'Ubuntu Mono', 'monospace'],
    },
    extend: {
      colors: {
        secondary: {
          50: 'var(--p-secondary-50)',
          100: 'var(--p-secondary-100)',
          200: 'var(--p-secondary-200)',
          300: 'var(--p-secondary-300)',
          400: 'var(--p-secondary-400)',
          500: 'var(--p-secondary-500)',
          600: 'var(--p-secondary-600)',
          700: 'var(--p-secondary-700)',
          800: 'var(--p-secondary-800)',
          900: 'var(--p-secondary-900)',
          950: 'var(--p-secondary-950)',
        },
      },
      boxShadow: {
        nav: '0 2px 0 var(--p-primary-color)',
        card: '0 1px 4px 0 rgba(0,0,0,0.2)',
      },
      backgroundColor: {
        body: 'var(--body-background-color)',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};

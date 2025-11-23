// @ts-check
import { defineConfig } from 'astro/config';
import { LOCALES, DEFAULT_LOCALE, } from '/src/i18n/config';

export default defineConfig({
  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    routing: "manual",
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});


// @ts-check
import { defineConfig } from 'astro/config';
import { LOCALES, DEFAULT_LOCALE, SITEMAP_LOCALE_NAMES } from '/src/i18n/config';

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

  site: "https://priramsaku.si",
  integrations: [
  ],
});

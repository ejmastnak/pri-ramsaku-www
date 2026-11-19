// @ts-check
import { defineConfig } from 'astro/config';
import { LOCALES, DEFAULT_LOCALE, SITEMAP_LOCALE_NAMES } from '/src/i18n/config';

import sitemap from "/src/integrations/sitemap.js";
import redirects from "/src/integrations/redirects.js";

export default defineConfig({
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },

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
    sitemap(),
    redirects(),
  ],
});

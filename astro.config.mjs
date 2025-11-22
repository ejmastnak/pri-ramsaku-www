// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  i18n: {
    locales: env.PUBLIC_SUPPORTED_LOCALES.split(","),
    defaultLocale: env.PUBLIC_DEFAULT_LOCALE,
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


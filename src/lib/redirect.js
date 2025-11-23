import { routes } from "@/routes";
import { normalizeRoute } from "@/lib/routes.js";
import { LOCALES, DEFAULT_LOCALE, } from "@/i18n/config"

let locale = undefined;

// Try persisted locale from localStorage...
const persistedLocale = window.localStorage.getItem("user-locale");
if (LOCALES.includes(persistedLocale)) {
  locale = persistedLocale;
}

// No persisted locale found...
if (!locale) {
  const browserLocaleRegion = window.navigator.language || window.navigator.userLanguage || DEFAULT_LOCALE

  // e.g. 'en-US' vs 'en'
  const browserLocale = { locale: browserLocaleRegion, localeNoRegion: browserLocaleRegion.split('-')[0] }

  if (LOCALES.includes(browserLocale.locale)) {
    locale = browserLocale.locale;
  } else if (LOCALES.includes(browserLocale.localeNoRegion)) {
    locale = browserLocale.localeNoRegion;
  } else {
    locale = DEFAULT_LOCALE;
  }
}

// Find and redirect to explicit version of the current ambiguous route
const normalized = normalizeRoute(window.location.pathname);
if (normalized in routes) {
  const route = routes[normalized]
  if (locale in route.canonical) {
    window.location.replace(route.canonical[locale]);
  }
}

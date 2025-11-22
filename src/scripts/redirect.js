let locale = undefined;
const supportedLocales = import.meta.env.PUBLIC_SUPPORTED_LOCALES.split(",")
const defaultLocale = import.meta.env.PUBLIC_DEFAULT_LOCALE;

// Try persisted locale from localStorage...
const persistedLocale = window.localStorage.getItem("user-locale");
if (supportedLocales.includes(persistedLocale)) {
  locale = persistedLocale;
}

// No persisted locale found...
if (!locale) {
  const browserLocaleRegion = window.navigator.language || window.navigator.userLanguage || defaultLocale

  // e.g. 'en-US' vs 'en'
  const browserLocale = { locale: browserLocaleRegion, localeNoRegion: browserLocaleRegion.split('-')[0] }

  if (supportedLocales.includes(browserLocale.locale)) {
    locale = browserLocale.locale;
  } else if (supportedLocales.includes(browserLocale.localeNoRegion)) {
    locale = browserLocale.localeNoRegion;
  } else {
    locale = defaultLocale;
  }
}

// Redirect to explicit version of current route in best-matching locale
if (!window.location.pathname.startsWith(`/${locale}/`)) {
  window.location.replace(`/${locale}${window.location.pathname}`);
}

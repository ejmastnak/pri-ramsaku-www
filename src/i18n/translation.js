import { routeGroups } from "@/routes.js";

export function extractLocaleFromRoute(route) {
  const supportedLocales = import.meta.env.PUBLIC_SUPPORTED_LOCALES.split(",");
  const defaultLocale = import.meta.env.PUBLIC_DEFAULT_LOCALE;
  if (route.length >= 3) {
    const maybeLocale = route.substring(1, 3);
    if (supportedLocales.includes(maybeLocale)) {
      return maybeLocale;
    }
  }
  return defaultLocale;
}

/**
  Input a route group key (e.g. "home", "about") and a locale.
  Returns the explicit route for that locale and route group.
  End up with something like "/en/about"
*/
export function getExplicitRoute(routeGroupKey, locale) {
  const routeGroup = routeGroups[routeGroupKey];
  for (const [route, val] of Object.entries(routeGroup)) {
    if (val.type === "explicit" && route.substring(1, 3) === locale) {
      return route;
    }
  }
  return "#"; // no match found
}

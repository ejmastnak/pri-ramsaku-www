import { routeGroups, routes, routesToGroups, } from "@/routes.js";
import { LOCALES, DEFAULT_LOCALE, } from "@/i18n/config";

export function extractLocaleFromRoute(route) {
  const normalized = normalizeRoute(route);
  if (normalized.length >= 3) {
    const maybeLocale = normalized.substring(1, 3);
    if (LOCALES.includes(maybeLocale)) {
      return maybeLocale;
    }
  }
  return DEFAULT_LOCALE;
}

/**
  Input a route group key (e.g. "home", "about") and a locale.
  Returns the explicit route for that locale and route group.
  End up with something like "/en/about"
*/
export function getExplicitRoute(routeGroupName, locale) {
  const routeGroup = routeGroups[routeGroupName];
  for (const [route, val] of Object.entries(routeGroup)) {
    if (val.type === "explicit" && route.substring(1, 3) === locale) {
      return route;
    }
  }
  return "#"; // no match found
}

/**
  Used to normalize Astro pathnames
*/
export function normalizeRoute(pathname) {
  return (pathname != "/") ? pathname.replace(/\/$/, "") : pathname;
}

/**
   Maps routes to their parent group 
*/
export function routeToGroupName(route) {
  const normalized = normalizeRoute(route);
  return (normalized in routesToGroups) ? routesToGroups[normalized] : undefined;
}

/**
  Returns the canonical routes for a given given ambiguous-locale route.
  E.g. input "/" and get back `{ "en": "/en", "sl": "/sl" }`
*/
export function explicitRoutesForAmbiguousRoute(ambiguousRoute) {
  const normalized = normalizeRoute(ambiguousRoute)
  if (ambiguousRoute in routes) {
    return ("canonical" in routes[ambiguousRoute]) ? routes[ambiguousRoute].canonical : undefined;
  }
  return undefined;
}

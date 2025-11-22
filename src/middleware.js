import { defineMiddleware } from "astro:middleware";
import {
  requestHasLocale,
  redirectToDefaultLocale,
  getRelativeLocaleUrl,
  notFound,
} from "astro:i18n";
import { routeGroups, routes } from "@/routes";

export const onRequest = defineMiddleware((ctx, next) => {
  let pathname = ctx.url.pathname;

  // Trim trailing slash, if present, except for home route
  if (pathname != "/") pathname = pathname.replace(/\/$/, "");

  if (pathname in routes) {
    const route = routes[pathname];
    if (route.type == 'explicit') {
      return next(); 
    }
    else if (route.type == 'implicit') {
      return ctx.redirect(route.canonical, 302);
    } else if (route.type == 'ambiguous') {
      return next();  // client handles redirect
    } 
  }

  return next();
});

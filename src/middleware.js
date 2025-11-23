import { defineMiddleware } from "astro:middleware";
import {
  requestHasLocale,
  redirectToDefaultLocale,
  getRelativeLocaleUrl,
  notFound,
} from "astro:i18n";
import { routes } from "@/routes";
import { normalizeRoute } from "@/lib/routes.js";

export const onRequest = defineMiddleware((ctx, next) => {
  const pathname = normalizeRoute(ctx.url.pathname);

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

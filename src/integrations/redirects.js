import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { routeGroups } from "../routes.js";

function normalizePathname(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function generateRedirects(routeGroups) {
  const redirects = [];

  for (const group of Object.values(routeGroups)) {
    for (const [pathname, meta] of Object.entries(group)) {
      if (meta.type !== "implicit") continue;

      redirects.push(
        // Once with trailing slash source, once without
        `${normalizePathname(pathname)} ${normalizePathname(meta.canonical)} 301`,
        `${pathname} ${normalizePathname(meta.canonical)} 301`,
      );
    }
  }

  return redirects.length
    ? redirects.join("\n") + "\n"
    : "";
}

export default function redirects() {
  return {
    name: "redirects",

    hooks: {
      async "astro:build:done"({ dir }) {
        const output = generateRedirects(routeGroups);

        await writeFile(
          fileURLToPath(new URL("_redirects", dir)),
          output,
          "utf8"
        );
      },
    },
  };
}

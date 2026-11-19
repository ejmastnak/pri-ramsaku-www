import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { routeGroups } from "../routes.js";
import { LOCALES } from "../i18n/config.js";

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[char]);
}

function normalizePathname(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function absoluteUrl(site, pathname) {
  return new URL(normalizePathname(pathname), site).href;
}

/**
 * Validate route metadata required for sitemap generation.
 *
 * Every group must have exactly one explicit route per locale.
 * Implicit and ambiguous routes must point to their corresponding
 * explicit routes.
 */
function validateRoutes(routeGroups, locales) {
  const errors = [];
  const knownRoutes = new Map();

  for (const [groupName, group] of Object.entries(routeGroups)) {
    const explicit = Object.entries(group).filter(
      ([, meta]) => meta.type === "explicit"
    );

    const ambiguous = Object.entries(group).filter(
      ([, meta]) => meta.type === "ambiguous"
    );

    const implicit = Object.entries(group).filter(
      ([, meta]) => meta.type === "implicit"
    );

    // Detect duplicate paths across route groups.
    for (const pathname of Object.keys(group)) {
      if (knownRoutes.has(pathname)) {
        errors.push(
          `Duplicate route "${pathname}" in groups "${knownRoutes.get(pathname)}" and "${groupName}"`
        );
      } else {
        knownRoutes.set(pathname, groupName);
      }

      if (!pathname.startsWith("/")) {
        errors.push(
          `${groupName}: route "${pathname}" must start with "/"`
        );
      }
    }

    // Every group must have exactly one explicit route per locale.
    const localizedRoutes = new Map();

    for (const [pathname, meta] of explicit) {
      if (!locales.includes(meta.locale)) {
        errors.push(
          `${groupName}: unsupported locale "${meta.locale}" on ${pathname}`
        );
        continue;
      }

      if (localizedRoutes.has(meta.locale)) {
        errors.push(
          `${groupName}: multiple explicit routes for locale "${meta.locale}"`
        );
      } else {
        localizedRoutes.set(meta.locale, pathname);
      }
    }

    for (const locale of locales) {
      if (!localizedRoutes.has(locale)) {
        errors.push(
          `${groupName}: missing explicit route for locale "${locale}"`
        );
      }
    }

    // There should be at most one ambiguous route per group.
    if (ambiguous.length > 1) {
      errors.push(
        `${groupName}: multiple ambiguous routes found`
      );
    }

    // Implicit routes must point to an explicit route in the same group.
    for (const [pathname, meta] of implicit) {
      if (!meta.canonical) {
        errors.push(
          `${groupName}: implicit route ${pathname} has no canonical destination`
        );
        continue;
      }

      const destination = group[meta.canonical];

      if (destination?.type !== "explicit") {
        errors.push(
          `${groupName}: implicit route ${pathname} points to a non-explicit or nonexistent destination: ${meta.canonical}`
        );
      }
    }

    // Ambiguous routes must point to the corresponding explicit
    // route for every supported locale.
    for (const [pathname, meta] of ambiguous) {
      for (const locale of locales) {
        const destination = meta.canonical?.[locale];

        if (!destination) {
          errors.push(
            `${groupName}: ambiguous route ${pathname} has no canonical destination for "${locale}"`
          );
          continue;
        }

        if (destination !== localizedRoutes.get(locale)) {
          errors.push(
            `${groupName}: ambiguous route ${pathname} has an incorrect canonical destination for "${locale}": ${destination}`
          );
        }
      }
    }
  }

  if (errors.length) {
    throw new Error(
      `Route validation failed:\n- ${errors.join("\n- ")}`
    );
  }
}

/**
 * Generate an international sitemap.
 *
 * Only explicit-locale routes become URL entries.
 * Every entry receives all localized alternates, including itself.
 * Groups with an ambiguous route additionally receive x-default.
 */
function generateSitemap(site, routeGroups, locales) {
  const urls = [];

  for (const group of Object.values(routeGroups)) {
    const entries = Object.entries(group);

    const explicit = entries.filter(
      ([, meta]) => meta.type === "explicit"
    );

    const ambiguous = entries.find(
      ([, meta]) => meta.type === "ambiguous"
    );

    const localizedRoutes = Object.fromEntries(
      explicit.map(([pathname, meta]) => [
        meta.locale,
        pathname,
      ])
    );

    for (const [pathname] of explicit) {
      const alternateLinks = locales.map((locale) => {
        const href = absoluteUrl(
          site,
          localizedRoutes[locale]
        );

        return `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}" />`;
      });

      if (ambiguous) {
        const defaultHref = absoluteUrl(
          site,
          ambiguous[0]
        );

        alternateLinks.push(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultHref)}" />`
        );
      }

      urls.push(`  <url>
    <loc>${escapeXml(absoluteUrl(site, pathname))}</loc>
${alternateLinks.join("\n")}
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join("\n")}
</urlset>
`;
}

export default function sitemap() {
  let site;

  return {
    name: "sitemap",

    hooks: {
      "astro:config:done"({ config }) {
        if (!config.site) {
          throw new Error(
            "Set site in astro.config.js before generating the sitemap."
          );
        }

        site = config.site;
      },

      async "astro:build:done"({ dir }) {
        validateRoutes(routeGroups, LOCALES);

        const xml = generateSitemap(
          site,
          routeGroups,
          LOCALES
        );

        await writeFile(
          fileURLToPath(new URL("sitemap.xml", dir)),
          xml,
          "utf8"
        );
      },
    },
  };
}

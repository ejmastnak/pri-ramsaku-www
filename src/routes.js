const routeGroups = {

  home: {
    "/": { type: "ambiguous", canonical: {"en": "/en", "sl": "/sl"} },
    "/en": { type: "explicit", locale: "en" },
    "/sl": { type: "explicit", locale: "sl" },
  },

  about: {
    "/about": { type: "implicit", locale: "en", canonical: "/en/about" },
    "/en/about": { type: "explicit", locale: "en" },
    "/o-nas": { type: "implicit", locale: "sl", canonical: "/sl/o-nas" },
    "/sl/o-nas": { type: "explicit", locale: "sl" },
  },

  cultivars: {
    "/about/cultivars": { type: "implicit", locale: "en", canonical: "/en/about/cultivars" },
    "/en/about/cultivars": { type: "explicit", locale: "en" },
    "/o-nas/stare-sorte": { type: "implicit", locale: "sl", canonical: "/sl/o-nas/stare-sorte" },
    "/sl/o-nas/stare-sorte": { type: "explicit", locale: "sl" },
  },

  appleCultivars: {
    "/about/apple-cultivars": { type: "implicit", locale: "en", canonical: "/en/about/apple-cultivars" },
    "/en/about/apple-cultivars": { type: "explicit", locale: "en" },
    "/o-nas/sorte-jabolk": { type: "implicit", locale: "sl", canonical: "/sl/o-nas/sorte-jabolk" },
    "/sl/o-nas/sorte-jabolk": { type: "explicit", locale: "sl" },
  },

  pearCultivars: {
    "/about/pear-cultivars": { type: "implicit", locale: "en", canonical: "/en/about/pear-cultivars" },
    "/en/about/pear-cultivars": { type: "explicit", locale: "en" },
    "/o-nas/sorte-hrusk": { type: "implicit", locale: "sl", canonical: "/sl/o-nas/sorte-hrusk" },
    "/sl/o-nas/sorte-hrusk": { type: "explicit", locale: "sl" },
  },

  meadowOrchard: {
    "/about/meadow-orchard": { type: "implicit", locale: "en", canonical: "/en/about/meadow-orchard" },
    "/en/about/meadow-orchard": { type: "explicit", locale: "en" },
    "/o-nas/travniski-sadovnjak": { type: "implicit", locale: "sl", canonical: "/sl/o-nas/travniski-sadovnjak" },
    "/sl/o-nas/travniski-sadovnjak": { type: "explicit", locale: "sl" },
  },

  howToBuy: {
    "/how-to-buy": { type: "implicit", locale: "en", canonical: "/en/how-to-buy" },
    "/en/how-to-buy": { type: "explicit", locale: "en" },
    "/nakup": { type: "implicit", locale: "sl", canonical: "/sl/nakup" },
    "/sl/nakup": { type: "explicit", locale: "sl" },
  },

  contact: {
    "/contact": { type: "implicit", locale: "en", canonical: "/en/contact" },
    "/en/contact": { type: "explicit", locale: "en" },
    "/kontakt": { type: "implicit", locale: "sl", canonical: "/sl/kontakt" },
    "/sl/kontakt": { type: "explicit", locale: "sl" },
  },

  products: {
    "/products": { type: "implicit", locale: "en", canonical: "/en/products" },
    "/en/products": { type: "explicit", locale: "en" },
    "/izdelki": { type: "implicit", locale: "sl", canonical: "/sl/izdelki" },
    "/sl/izdelki": { type: "explicit", locale: "sl" },
  },

  jabsok: {
    "/jabsok": { type: "ambiguous", canonical: {"en": "/en/products/apple-juice", "sl": "/sl/izdelki/jabolcni-sok"} },
    "/products/apple-juice": { type: "implicit", locale: "en", canonical: "/en/products/apple-juice" },
    "/en/products/apple-juice": { type: "explicit", locale: "en" },
    "/izdelki/jabolcni-sok": { type: "implicit", locale: "sl", canonical: "/sl/izdelki/jabolcni-sok" },
    "/sl/izdelki/jabolcni-sok": { type: "explicit", locale: "sl" },
  },

  jabkis: {
    "/jabkis": { type: "ambiguous", canonical: {"en": "/en/products/apple-cider-vinegar", "sl": "/sl/izdelki/jabolcni-kis"} },
    "/products/apple-cider-vinegar": { type: "implicit", locale: "en", canonical: "/en/products/apple-cider-vinegar" },
    "/en/products/apple-cider-vinegar": { type: "explicit", locale: "en" },
    "/izdelki/jabolcni-kis": { type: "implicit", locale: "sl", canonical: "/sl/izdelki/jabolcni-kis" },
    "/sl/izdelki/jabolcni-kis": { type: "explicit", locale: "sl" },
  },

  sntolj: {
    "/sntolj": { type: "ambiguous", canonical: {"en": "/en/products/st-johns-wort-oil", "sl": "/sl/izdelki/sentjanzevo-olje"} },
    "/products/st-johns-wort-oil": { type: "implicit", locale: "en", canonical: "/en/products/st-johns-wort-oil" },
    "/en/products/st-johns-wort-oil": { type: "explicit", locale: "en" },
    "/izdelki/sentjanzevo-olje": { type: "implicit", locale: "sl", canonical: "/sl/izdelki/sentjanzevo-olje" },
    "/sl/izdelki/sentjanzevo-olje": { type: "explicit", locale: "sl" },
  },

  otherProducts: {
    "/products/by-agreement": { type: "implicit", locale: "en", canonical: "/en/products/by-agreement" },
    "/en/products/by-agreement": { type: "explicit", locale: "en" },
    "/izdelki/po-dogovoru": { type: "implicit", locale: "sl", canonical: "/sl/izdelki/po-dogovoru" },
    "/sl/izdelki/po-dogovoru": { type: "explicit", locale: "sl" },
  },

};

const routes = Object.assign({}, ...Object.values(routeGroups));

// Flattened structure for O(1) reverse lookup of group name from route
const routesToGroups = Object.fromEntries(
  Object.entries(routeGroups).flatMap(([groupName, groupRoutes]) =>
    Object.keys(groupRoutes).map((route) => [route, groupName])
  )
);

export { routeGroups, routes, routesToGroups };

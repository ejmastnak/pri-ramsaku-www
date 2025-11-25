const routeGroups = {

  home: {
    "/": { type: "ambiguous", canonical: {"en": "/en", "sl": "/sl"} },
    "/en": { type: "explicit", },
    "/sl": { type: "explicit", },
  },

  about: {
    "/about": { type: "implicit", canonical: "/en/about"  },
    "/en/about": { type: "explicit", },
    "/o-nas": { type: 'implicit', canonical: "/sl/o-nas", },
    "/sl/o-nas": { type: 'explicit', },
  },

  contact: {
    "/contact": { type: "implicit", canonical: "/en/contact"  },
    "/en/contact": { type: "explicit", },
    "/kontakt": { type: 'implicit', canonical: "/sl/kontakt", },
    "/sl/kontakt": { type: 'explicit', },
  },

  products: {
    "/products": { type: "implicit", canonical: "/en/products" },
    "/en/products": { type: "explicit", },
    "/izdelki": { type: "implicit", canonical: "/sl/izdelki" },
    "/sl/izdelki": { type: "explicit", },
  },

jabsok: {
    "/jabsok": { type: "ambiguous", canonical: {"en": "/en/products/apple-juice", "sl": "/sl/izdelki/jabolcni-sok"} },
    "/products/apple-juice": { type: "implicit", canonical: "/en/products/apple-juice" },
    "/en/products/apple-juice": { type: "explicit", },
    "/izdelki/jabolcni-sok": { type: "implicit", canonical: "/sl/izdelki/jabolcni-sok" },
    "/sl/izdelki/jabolcni-sok": { type: "explicit", },
  },

  jabkis: {
    "/jabkis": { type: "ambiguous", canonical: {"en": "/en/products/apple-juice", "sl": "/sl/izdelki/jabolcni-kis"} },
    "/products/apple-cider-vinegar": { type: "implicit", canonical: "/en/products/apple-cider-vinegar" },
    "/en/products/apple-cider-vinegar": { type: "explicit", },
    "/izdelki/jabolcni-kis": { type: "implicit", canonical: "/sl/izdelki/jabolcni-kis" },
    "/sl/izdelki/jabolcni-kis": { type: "explicit", },
  },

  sntolj: {
    "/sntolj": { type: "ambiguous", canonical: {"en": "/en/products/apple-juice", "sl": "/sl/izdelki/sentjanzevo-olje"} },
    "/products/st-johns-wort-oil": { type: "implicit", canonical: "/en/products/st-johns-wort-oil" },
    "/en/products/st-johns-wort-oil": { type: "explicit", },
    "/izdelki/sentjanzevo-olje": { type: "implicit", canonical: "/sl/izdelki/sentjanzevo-olje" },
    "/sl/izdelki/sentjanzevo-olje": { type: "explicit", },
  },

  varieties: {
    "/heirloom-varieties": { type: "implicit", canonical: "/en/heirloom-varieties" },
    "/en/heirloom-varieties": { type: "explicit", },
    "/stare-sorte": { type: "implicit", canonical: "/sl/stare-sorte" },
    "/sl/stare-sorte": { type: "explicit", },
  },

  appleVarieties: {
    "/heirloom-varieties/apples": { type: "implicit", canonical: "/en/heirloom-varieties/apples" },
    "/en/heirloom-varieties/apples": { type: "explicit", },
    "/stare-sorte/jabolka": { type: "implicit", canonical: "/sl/stare-sorte/jabolka" },
    "/sl/stare-sorte/jabolka": { type: "explicit", },
  },

  pearVarieties: {
    "/heirloom-varieties/pears": { type: "implicit", canonical: "/en/heirloom-varieties/pears" },
    "/en/heirloom-varieties/pears": { type: "explicit", },
    "/stare-sorte/hruske": { type: "implicit", canonical: "/sl/stare-sorte/hruske" },
    "/sl/stare-sorte/hruske": { type: "explicit", },
  },

  meadowOrchard: {
    "/meadow-orchard": { type: "implicit", canonical: "/en/meadow-orchard" },
    "/en/meadow-orchard": { type: "explicit", },
    "/travniski-sadovnjak": { type: "implicit", canonical: "/sl/travniski-sadovnjak" },
    "/sl/travniski-sadovnjak": { type: "explicit", },
  },

}

const routes = Object.assign({}, ...Object.values(routeGroups));

// Flattened structure for O(1) reverse lookup of group name from route
const routesToGroups = Object.fromEntries(
  Object.entries(routeGroups).flatMap(([groupName, groupRoutes]) =>
    Object.keys(groupRoutes).map((route) => [route, groupName])
  )
);

export { routeGroups, routes, routesToGroups };

const routeGroups = {

  home: {
    "/": { type: "ambiguous", canonical: {"en": "/en", "sl": "/sl"} },
    "/en": { type: "explicit", },
    "/sl": { type: "explicit", },
  },

  about: {
    "/about": { type: "implicit", canonical: "/en/about" },
    "/en/about": { type: "explicit", },
    "/o-nas": { type: 'implicit', canonical: "/sl/o-nas", },
    "/sl/o-nas": { type: 'explicit', },
  },

  varieties: {
    "/about/varieties": { type: "implicit", canonical: "/en/about/varieties" },
    "/en/about/varieties": { type: "explicit", },
    "/o-nas/stare-sorte": { type: "implicit", canonical: "/sl/o-nas/stare-sorte" },
    "/sl/o-nas/stare-sorte": { type: "explicit", },
  },

  appleVarieties: {
    "/about/apple-varieties": { type: "implicit", canonical: "/en/about/apple-varieties" },
    "/en/about/apple-varieties": { type: "explicit", },
    "/o-nas/sorte-jabolk": { type: "implicit", canonical: "/sl/o-nas/sorte-jabolk" },
    "/sl/o-nas/sorte-jabolk": { type: "explicit", },
  },

  pearVarieties: {
    "/about/pear-varieties": { type: "implicit", canonical: "/en/about/pear-varieties" },
    "/en/about/pear-varieties": { type: "explicit", },
    "/o-nas/sorte-hrusk": { type: "implicit", canonical: "/sl/o-nas/sorte-hrusk" },
    "/sl/o-nas/sorte-hrusk": { type: "explicit", },
  },

  meadowOrchard: {
    "/about/meadow-orchard": { type: "implicit", canonical: "/en/about/meadow-orchard" },
    "/en/about/meadow-orchard": { type: "explicit", },
    "/o-nas/travniski-sadovnjak": { type: "implicit", canonical: "/sl/o-nas/travniski-sadovnjak" },
    "/sl/o-nas/travniski-sadovnjak": { type: "explicit", },
  },

  howToBuy: {
    "/how-to-buy": { type: "implicit", canonical: "/en/how-to-buy" },
    "/en/how-to-buy": { type: "explicit", },
    "/nakup": { type: 'implicit', canonical: "/sl/nakup", },
    "/sl/nakup": { type: 'explicit', },
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

  otherProducts: {
    "/products/by-agreement": { type: "implicit", canonical: "/en/products/by-agreement" },
    "/en/products/by-agreement": { type: "explicit", },
    "/izdelki/po-dogovoru": { type: "implicit", canonical: "/sl/izdelki/po-dogovoru" },
    "/sl/izdelki/po-dogovoru": { type: "explicit", },
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

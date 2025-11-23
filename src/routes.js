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

  products: {
    "/products": { type: "implicit", canonical: "/en/products" },
    "/en/products": { type: "explicit", },
    "/izdelki": { type: "implicit", canonical: "/sl/izdelki" },
    "/sl/izdelki": { type: "explicit", },
  },

  // jabsok: {
  //   "/products/apple-juice": { type: "implicit", canonical: "/en/products/apple-juice" },
  //   "/en/products/apple-juice": { type: "explicit", },
  //   "/izdelki/jabolcni-sok": { type: "implicit", canonical: "/sl/izdelki/jabolcni-sok" },
  //   "/sl/izdelki/jabolcni-sok": { type: "explicit", },
  // },


  // // --------------------------------------------------------- //
  // // Products/JabSok
  // // --------------------------------------------------------- //
  // { path: '/jabsok', name: 'jabsok', component: JabSok, },

  // // --------------------------------------------------------- //
  // // Products/JabKis
  // // --------------------------------------------------------- //
  // { path: '/jabkis', name: 'jabkis', component: JabKis, },
  // { path: '/products/apple-cider-vinegar', name: 'jabkis.EN', component: JabKis, },
  // { path: '/en/products/apple-cider-vinegar', name: 'jabkis.en', component: JabKis, },
  // { path: '/izdelki/jabolcni-kis', name: 'jabkis.SL', component: JabKis, },
  // { path: '/sl/izdelki/jabolcni-kis', name: 'jabkis.sl', component: JabKis, },

  // // --------------------------------------------------------- //
  // // Products/SntOlj
  // // --------------------------------------------------------- //
  // { path: '/sntolj', name: 'sntolj', component: SntOlj, },
  // { path: '/products/st-johns-wort-oil', name: 'sntolj.EN', component: SntOlj, },
  // { path: '/en/products/st-johns-wort-oil', name: 'sntolj.en', component: SntOlj, },
  // { path: '/izdelki/sentjanzevo-olje', name: 'sntolj.SL', component: SntOlj, },
  // { path: '/sl/izdelki/sentjanzevo-olje', name: 'sntolj.sl', component: SntOlj, },


}

const routes = Object.assign({}, ...Object.values(routeGroups));

// Flattened structure for O(1) reverse lookup of group name from route
const routesToGroups = Object.fromEntries(
  Object.entries(routeGroups).flatMap(([groupName, groupRoutes]) =>
    Object.keys(groupRoutes).map((route) => [route, groupName])
  )
);

export { routeGroups, routes, routesToGroups };

const routeGroups = {
  home: {
    "/": { type: "ambiguous" },
    "/en": { type: "explicit", },
    "/sl": { type: "explicit", },
  },
  about: {
    "/about": { type: "implicit", canonical: "/en/about"  },
    "/en/about": { type: "explicit", },
    "/o-nas": { type: 'implicit', canonical: "/sl/o-nas", },
    "/sl/o-nas": { type: 'explicit', },
  },
}

const routes = Object.assign({}, ...Object.values(routeGroups));

export { routeGroups, routes };


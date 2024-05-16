import DetailsOfMovie from "./views/details.js";
import HomeContainer from "./views/home.js";
import SearchPage from "./views/searchPage.js";
const navigateTo = (url: string) => {
  // console.log(url);
  // history.pushState(null, null, url) ase kna tviton

  history.pushState(null, "", url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: HomeContainer },
    { path: "/library", view: DetailsOfMovie },
    { path: `/details/:id`, view: DetailsOfMovie },
    { path: `/search/:key`, view: SearchPage },
  ];

  const match = routes.find((route) => {
    const routePathSegments = route.path
      .split("/")
      .filter((segment) => segment !== "");
    const urlPathSemgents = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    if (routePathSegments.length != urlPathSemgents.length) {
      return false;
    }

    const match = routePathSegments.every((routeSegment, i) => {
      return (
        routeSegment === urlPathSemgents[i] || routeSegment.startsWith(":")
      );
    });

    return match;
  });
  // console.log(match, "sfewefw");

  //   if (!match) {
  //     match = {
  //       route: routes[0],
  //       isMatch: true,
  //     };
  //   }

  // const view = await match.route.view();
  const view = await match.view();

  const mainPage = document.querySelector("#main-page") as HTMLDivElement;
  mainPage.innerHTML = view;
  // console.log(match.route.view());
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", (e) => {
  document.body.addEventListener("click", (e) => {
    // console.log(e.target.id, "afafaf");
    if ((e.target as HTMLAnchorElement).matches("[data-link]")) {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).href);
      // console.log((e.target as HTMLAnchorElement).href);
    }
  });
  router();
});
// window.addEventListener("click", (e) => {
//   // e.preventDefault();
//   console.log(e.target);
// });

const input = document.getElementById("search-bar");
console.log(input.value);

document.addEventListener("keypress", (e) => {
  // if (e.key === "Enter") {
  //   e.preventDefault();
  //   console.log(input.value);
  // }
  console.log(input.value);
});

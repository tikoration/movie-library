import { Search } from "./components/search.js";
import DetailsOfMovie from "./views/details.js";
import HomeContainer from "./views/home.js";
import Searched from "./views/searchedPage.js";
const navigateTo = (url: string) => {
  // console.log(url);
  // history.pushState(null, null, url) ase kna tviton
  history.pushState(null, "", url);
  router();
};

Search()

const router = async () => {
  const routes = [
    { path: "/", view: HomeContainer },
    { path: "/library", view: DetailsOfMovie },
    { path: "/search/:key", view: Searched},
    { path: `/details/:id`, view: DetailsOfMovie },
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
  
  document.body.addEventListener("keypress", (e) => {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement)
    if (e.key === 'Enter') {
      if(document.activeElement instanceof HTMLInputElement){
        e.preventDefault();
        navigateTo(`/search/${searchTerm.value}`);
      }
    }
  });
  router();
});


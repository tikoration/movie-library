import { Search } from "./components/search.js";
import DetailsOfMovie from "./views/details.js";
import { ErrorPage } from "./views/errorPage.js";
import HomeContainer from "./views/home.js";
import { Lists } from "./views/lists.js";
import Searched from "./views/searchedPage.js";

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

Search();

const router = async () => {
  const routes = [
    { path: "/", view: HomeContainer },
    { path: "/library", view: Lists },
    { path: `/movie/:id`, view: DetailsOfMovie },
    { path: "/search/:key", view: Searched },
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

  const view = (await match?.view()) || ErrorPage();

  const mainPage = document.querySelector("#main-page") as HTMLDivElement;
  mainPage.innerHTML = view;
  Lists();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if ((e.target as HTMLAnchorElement).matches("[data-link]")) {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).href);
    }
  });

  document.body.addEventListener("keypress", (e) => {
    const searchTerm = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (e.key === "Enter") {
      if (document.activeElement instanceof HTMLInputElement) {
        e.preventDefault();
        navigateTo(`/search/${searchTerm.value}`);
      }
    }
  });
  router();
});

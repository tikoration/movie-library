var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Search } from "./components/search.js";
import DetailsOfMovie from "./views/details.js";
import HomeContainer from "./views/home.js";
import Searched from "./views/searchedPage.js";
const navigateTo = (url) => {
    // console.log(url);
    // history.pushState(null, null, url) ase kna tviton
    history.pushState(null, "", url);
    router();
};
Search();
const router = () => __awaiter(void 0, void 0, void 0, function* () {
    const routes = [
        { path: "/", view: HomeContainer },
        { path: "/library", view: DetailsOfMovie },
        { path: "/search/:key", view: Searched },
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
            return (routeSegment === urlPathSemgents[i] || routeSegment.startsWith(":"));
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
    const view = yield match.view();
    const mainPage = document.querySelector("#main-page");
    mainPage.innerHTML = view;
    // console.log(match.route.view());
});
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", (e) => {
    document.body.addEventListener("click", (e) => {
        // console.log(e.target.id, "afafaf");
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
            // console.log((e.target as HTMLAnchorElement).href);
        }
    });
    document.body.addEventListener("keypress", (e) => {
        const searchTerm = document.getElementById('searchInput');
        if (e.key === 'Enter') {
            if (document.activeElement instanceof HTMLInputElement) {
                e.preventDefault();
                navigateTo(`/search/${searchTerm.value}`);
            }
        }
    });
    router();
});

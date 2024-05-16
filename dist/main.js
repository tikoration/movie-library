var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DetailsOfMovie from "./views/details.js";
import HomeContainer from "./views/home.js";
import SearchPage from "./views/searchPage.js";
const navigateTo = (url) => {
    // console.log(url);
    // history.pushState(null, null, url) ase kna tviton
    history.pushState(null, "", url);
    router();
};
const router = () => __awaiter(void 0, void 0, void 0, function* () {
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

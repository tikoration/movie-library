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
const navigateTo = (url) => {
    // console.log(url);
    // history.pushState(null, null, url) ase kna tviton
    const numbers = url.match(/\d+$/);
    const extractedNumber = numbers ? numbers[0] : null;
    console.log(extractedNumber); // Output: "823464"  history.pushState(null, "", url);
    router(extractedNumber);
};
const router = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (id = "/") {
    const routes = [
        { path: "/", view: HomeContainer },
        { path: "/library", view: DetailsOfMovie },
        { path: `/details/${id}`, view: DetailsOfMovie },
    ];
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            isMatch: location.pathname === route.path,
        };
    });
    // console.log(potentialMatches, "potential,mat");
    // console.log(location.pathname);
    let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
    console.log(match, "match");
    // defaulting to root index[0]
    // if (!match) {
    //   match = {
    //     route: routes[0],
    //     isMatch: true,
    //   };
    // }
    const view = match.route.view();
    // console.log(view, "view");
    const mainPage = document.querySelector("#main-page");
    mainPage.innerHTML = yield view;
    // console.log(match.route.view());
});
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", (e) => {
    document.body.addEventListener("click", (e) => {
        console.log(e.target.id, "afafaf");
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
            // console.log((e.target as HTMLAnchorElement).href);
        }
    });
    router();
});

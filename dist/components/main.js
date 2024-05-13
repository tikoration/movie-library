var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DetailsOfMovie from "./details.js";
const mainPageElement = document.getElementById("main-page");
const route = (event) => {
    event = event || window.event;
    event === null || event === void 0 ? void 0 : event.preventDefault();
    // console.log(event.target);
    window.history.pushState({}, "dd", event.target.href);
    handleLocation();
};
const routes = {
    404: "/pages/404.html",
    "/": "/pages/main.html",
    "/details": "/pages/details.html",
};
const handleLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = window.location.pathname;
    console.log(path);
    const routeUrl = routes[path] || routes[404];
    const html = yield fetch(routeUrl).then((data) => data.text());
    if (mainPageElement) {
        mainPageElement.innerHTML = html;
    }
    const homeContainer = document.querySelector(".home-container");
    const detailsContainer = document.querySelector(".details-container");
    if (detailsContainer) {
        detailsContainer.innerHTML = DetailsOfMovie();
    }
});
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
// //////
// In main.ts
// async function getmovie() {
//   const fetched = await fetch(
//     `https://api.themoviedb.org/3/movie/550?api_key=88f63d75ae40120899216aa75faa6c13`
//   );
//   console.log(fetched);
//   const data = await fetched.json();
//   console.log(data);
// }
// getmovie();

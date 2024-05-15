"use strict";
// import Explore from "./components/explore.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import DetailsOfMovie from "./pages/details.js";
// import { getMovieById, getPopularMovies } from "./services/apiMovies.js";
// import { PopularMovies } from "./components/popularMovies.js";
// const mainPageElement = document.getElementById("main-page") as HTMLElement;
// // export const route = (event: MouseEvent) => {
// //   event = event || window.event;
// //   event?.preventDefault();
// //   window.history.pushState({}, "dd", (event.target as HTMLAnchorElement).href);
// //   handleLocation();
// // };
// function router() {
//   let view = routes[location.pathname];
//   if (view) {
//     document.title = view.title;
//     mainPageElement.innerHTML = view.render();
//   } else {
//     history.replaceState("", "", "/");
//     router();
//   }
// }
// type Route = {
//   [key: string]: { title: string; render: () => string }; // Allow any string key
// };
// // const routes: Route = {
// //   404: "/pages/404.html",
// //   "/": "/pages/main.html",
// //   "/details": "/pages/details.html",
// // };
// const routes: Route = {
//   // 404: "/pages/404.html",
//   "/": { title: "home", render: Home },
//   "/details": { title: "details", render: details },
// };
// // const handleLocation = async () => {
// //   const path = window.location.pathname;
// //   const routeUrl = routes[path] || routes[404];
// //   const html = await fetch(routeUrl).then((data) => data.text());
// //   if (mainPageElement) {
// //     mainPageElement.innerHTML = html;
// //   }
// //   const homeContainer = document.querySelector(".home-container");
// //   const detailsContainer = document.querySelector(".details-container");
// //   const explore = document.getElementById("explore");
// //   console.log(explore);
// //   const popularsContainer = document.getElementById("populars-container");
// //   if (explore) {
// //     explore.innerHTML = Explore();
// //   }
// //   if (popularsContainer) {
// //     //   // const { results } = await getPopularMovies();
// //     //   // console.log(results);
// //     popularsContainer.innerHTML = await PopularMovies();
// //   }
// //   if (homeContainer) {
// //     const pop = document.querySelector(".populars");
// //     const newDiv = document.createElement("div");
// //     // const data = await getPopularMovies();
// //     // console.log(data);
// //     // popularsContainer.innerHTML = popularMovies();
// //   }
// //   if (detailsContainer) {
// //     detailsContainer.innerHTML = DetailsOfMovie();
// //   }
// // };
// // Handle navigation
// window.addEventListener("click", e => {
//   if (e.target.matches("[data-link]")) {
//       e.preventDefault();
//       history.pushState("", "", e.target.href);
//       router();
//   }
// });
// // Update router
// window.addEventListener("popstate", router);
// window.addEventListener("DOMContentLoaded", router);
// // window.onpopstate = handleLocation;
// // (window as any).route = route;
// // handleLocation();
const router = () => __awaiter(void 0, void 0, void 0, function* () {
    const routes = [
        { path: '/', view: () => console.log('vsdd') },
        { path: '/details', view: () => console.log('vsdd') },
    ];
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
});

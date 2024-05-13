var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
// import Explore from "./components/explore.js";
// import Explore from "./explore.js";
// import Explore from "./explore.js";
import Explore from "./components/explore.js";
// import Explore from "./explore.js";
import DetailsOfMovie from "./components/details.js";
import { getPopularMovies } from "./services/apiMovies.js";
const mainPageElement = document.getElementById("main-page");
const route = (event) => {
  event = event || window.event;
  event === null || event === void 0 ? void 0 : event.preventDefault();
  window.history.pushState({}, "dd", event.target.href);
  handleLocation();
};
const routes = {
  404: "/pages/404.html",
  "/": "/pages/main.html",
  "/details": "/pages/details.html",
};
const handleLocation = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const path = window.location.pathname;
    const routeUrl = routes[path] || routes[404];
    const html = yield fetch(routeUrl).then((data) => data.text());
    if (mainPageElement) {
      mainPageElement.innerHTML = html;
    }
    const homeContainer = document.querySelector(".home-container");
    const detailsContainer = document.querySelector(".details-container");
    const explore = document.getElementById("explore");
    if (explore) {
      explore.innerHTML = Explore();
    }
    if (homeContainer) {
      const pop = document.querySelector(".populars");
      const newDiv = document.createElement("div");
      const data = yield getPopularMovies();
      console.log(data);
    }
    if (detailsContainer) {
      detailsContainer.innerHTML = DetailsOfMovie();
    }
  });
window.onpopstate = handleLocation;
window.route = route;
handleLocation();

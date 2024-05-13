import Explore from './components/explore.js';
import DetailsOfMovie from "./details.js";
import { getMovieById, getPopularMovies } from "./services/apiMovies.js";
const mainPageElement = document.getElementById("main-page") as HTMLElement;

const route = (event: MouseEvent) => {
  event = event || window.event;
  event?.preventDefault();
  window.history.pushState({}, "", (event.target as HTMLAnchorElement).href);
  handleLocation();
};

type Route = {
  [key: string]: string; // Allow any string key
};

const routes: Route = {
  404: "/pages/404.html",
  "/": "/pages/main.html",
  "/details": "/pages/details.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;

  const routeUrl = routes[path] || routes[404];

  const html = await fetch(routeUrl).then((data) => data.text());

  if (mainPageElement) {
    mainPageElement.innerHTML = html;
  }

  const homeContainer = document.querySelector(".home-container");
  const detailsContainer = document.querySelector(".details-container");
  const explore = document.getElementById("explore");

  if(explore){
    explore.innerHTML = Explore();
  }
  if (homeContainer) {
    const pop = document.querySelector(".populars");
    const newDiv = document.createElement("div");
    const data = await getPopularMovies();
    console.log(data);
  }
  if (detailsContainer) {
    detailsContainer.innerHTML = DetailsOfMovie();
  }
};

window.onpopstate = handleLocation;
(window as any).route = route;
handleLocation();

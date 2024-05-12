import DetailsOfMovie from "./details.js";
import { getMovieById, getPopularMovies } from "./services/apiMovies.js";
const mainPageElement = document.getElementById("main-page") as HTMLElement;

const route = (event: MouseEvent) => {
  event = event || window.event;
  event?.preventDefault();
  // console.log(event.target);
  window.history.pushState({}, "dd", (event.target as HTMLAnchorElement).href);
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
  console.log(path);

  const routeUrl = routes[path] || routes[404];

  const html = await fetch(routeUrl).then((data) => data.text());

  if (mainPageElement) {
    mainPageElement.innerHTML = html;
  }

  const homeContainer = document.querySelector(".home-container");
  const detailsContainer = document.querySelector(".details-container");
  if (homeContainer) {
    const pop = document.querySelector(".populars");
    const newDiv = document.createElement("div");
    pop?.append;
  }
  if (detailsContainer) {
    detailsContainer.innerHTML = DetailsOfMovie();
  }
};

window.onpopstate = handleLocation;
(window as any).route = route;
handleLocation();

// //////

// In main.ts
//653346
// async function getmovie() {
//   const fetched = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=88f63d75ae40120899216aa75faa6c13`
//   );
//   console.log(fetched);
//   const data = await fetched.json();
//   console.log(data);
// }

// getmovie();

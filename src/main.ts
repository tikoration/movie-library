import Explore from './components/explore.js';

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
console.log(document.getElementById("explore"))
console.log("hi")
const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const routePath = path || "/";
  const routeUrl = routes[routePath] || routes[404];

  const html = await fetch(routeUrl).then((data) => data.text());

  const mainPageElement = document.getElementById("main-page");
  console.log(mainPageElement)
  if (mainPageElement) {
    mainPageElement.innerHTML = html;
  }
  const explore = document.getElementById("explore");
  if(explore){
    explore.innerHTML = Explore();
  }
};

window.onpopstate = handleLocation;
(window as any).route = route;

handleLocation();

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

export const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const routePath = path || "/";
  const routeUrl = routes[routePath] || routes[404];

  const html = await fetch(routeUrl).then((data) => data.text());

  const mainPageElement = document.getElementById("main-page");
  if (mainPageElement) {
    mainPageElement.innerHTML = html;
  }
};

window.onpopstate = handleLocation;
(window as any).route = route;

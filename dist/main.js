const mainPageElement = document.getElementById("main-page");
// export const route = (event: MouseEvent) => {
//   event = event || window.event;
//   event?.preventDefault();
//   window.history.pushState({}, "dd", (event.target as HTMLAnchorElement).href);
//   handleLocation();
// };
function router() {
    let view = routes[location.pathname];
    if (view) {
        document.title = view.title;
        mainPageElement.innerHTML = view.render();
    }
    else {
        history.replaceState("", "", "/");
        router();
    }
}
// const routes: Route = {
//   404: "/pages/404.html",
//   "/": "/pages/main.html",
//   "/details": "/pages/details.html",
// };
const routes = {
    // 404: "/pages/404.html",
    "/": { title: "home", render: Home },
    "/details": { title: "details", render: details },
};
// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const routeUrl = routes[path] || routes[404];
//   const html = await fetch(routeUrl).then((data) => data.text());
//   if (mainPageElement) {
//     mainPageElement.innerHTML = html;
//   }
//   const homeContainer = document.querySelector(".home-container");
//   const detailsContainer = document.querySelector(".details-container");
//   const explore = document.getElementById("explore");
//   console.log(explore);
//   const popularsContainer = document.getElementById("populars-container");
//   if (explore) {
//     explore.innerHTML = Explore();
//   }
//   if (popularsContainer) {
//     //   // const { results } = await getPopularMovies();
//     //   // console.log(results);
//     popularsContainer.innerHTML = await PopularMovies();
//   }
//   if (homeContainer) {
//     const pop = document.querySelector(".populars");
//     const newDiv = document.createElement("div");
//     // const data = await getPopularMovies();
//     // console.log(data);
//     // popularsContainer.innerHTML = popularMovies();
//   }
//   if (detailsContainer) {
//     detailsContainer.innerHTML = DetailsOfMovie();
//   }
// };
// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});
// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
export {};
// window.onpopstate = handleLocation;
// (window as any).route = route;
// handleLocation();

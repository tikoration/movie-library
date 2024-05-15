import DetailsOfMovie from "./views/details.js";
import HomeContainer from "./views/home.js";
const navigateTo = (url: string) => {
  // console.log(url);
  // history.pushState(null, null, url) ase kna tviton
  const numbers = url.match(/\d+$/);
  const extractedNumber = numbers ? numbers[0] : null;
  console.log(extractedNumber); // Output: "823464"  history.pushState(null, "", url);
  router(extractedNumber);
};

const router = async (id: number | string = "/") => {
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

  const mainPage = document.querySelector("#main-page") as HTMLDivElement;
  mainPage.innerHTML = await view;
  // console.log(match.route.view());
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", (e) => {
  document.body.addEventListener("click", (e) => {
    console.log(e.target.id, "afafaf");
    if ((e.target as HTMLAnchorElement).matches("[data-link]")) {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).href);
      // console.log((e.target as HTMLAnchorElement).href);
    }
  });
  router();
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Explore from './components/explore.js';
const route = (event) => {
    event = event || window.event;
    event === null || event === void 0 ? void 0 : event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};
const routes = {
    404: "/pages/404.html",
    "/": "/pages/main.html",
    "/details": "/pages/details.html",
};
console.log(document.getElementById("explore"));
console.log("hi");
const handleLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    const path = window.location.pathname;
    console.log(path);
    const routePath = path || "/";
    const routeUrl = routes[routePath] || routes[404];
    const html = yield fetch(routeUrl).then((data) => data.text());
    const mainPageElement = document.getElementById("main-page");
    console.log(mainPageElement);
    if (mainPageElement) {
        mainPageElement.innerHTML = html;
    }
    const explore = document.getElementById("explore");
    if (explore) {
        explore.innerHTML = Explore();
    }
});
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupInfiniteScroll } from "./infiniteScroll.js";
const api_key = "88f63d75ae40120899216aa75faa6c13";
setupInfiniteScroll();
const page = setupInfiniteScroll();
console.log(page);
const searchKey = location.pathname.split("/")[2];
export const Search = () => {
    function fetchData(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = 1;
            try {
                const response = yield fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${api_key}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error("Error fetching data:", error);
                return [];
            }
        });
    }
    function renderResults(results) {
        const searchResultsElement = document.getElementById("searchResults");
        const noMovies = document.getElementById("no-movies");
        results.length > 0
            ? results.forEach((result) => {
                const listItem = document.createElement("a");
                listItem.classList.add("movie-img-cont", 'search-results-item');
                listItem.href = `/movie/${result.id}`;
                const movieTitle = document.createElement("div");
                movieTitle.classList.add("movie-imdb-title");
                const movieT = document.createElement("p");
                movieT.innerHTML = result.title;
                movieTitle.append(movieT);
                const movieImg = document.createElement("img");
                movieImg.classList.add("movie-img");
                const altImg = result.poster_path || result.backdrop_path;
                movieImg.src = altImg
                    ? `https://image.tmdb.org/t/p/original${result.poster_path || result.backdrop_path}`
                    : "../../assets/imdb-logo.png";
                listItem.append(movieTitle, movieImg);
                searchResultsElement === null || searchResultsElement === void 0 ? void 0 : searchResultsElement.appendChild(listItem);
            })
            : (noMovies.innerHTML = "Could not find any movies");
    }
    document.getElementById("searchInput").addEventListener("keypress", (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (event.key === "Enter") {
            const searchTerm = document.getElementById("searchInput").value;
            if (!searchTerm.trim()) {
                document.getElementById("searchInput").innerHTML = "";
                return;
            }
            const { results } = yield fetchData(searchTerm);
            renderResults(results);
            const location = "/" + window.location.pathname.split("/")[1];
            if (location !== `/search`) {
                window.location.href = `/search/:${searchTerm}`;
            }
            document.getElementById("searchInput").value = "";
        }
    }));
    document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!searchKey.trim()) {
            document.getElementById("searchInput").innerHTML =
                "";
            return;
        }
        const { results } = yield fetchData(searchKey);
        renderResults(results);
        const location = "/" + window.location.pathname.split("/")[1];
        if (location !== `/search`) {
            window.location.href = `/search/:${searchKey}`;
        }
    }));
};

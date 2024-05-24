import { setupInfiniteScroll } from "../services/infiniteScroll.js";

interface SearchData {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
}
const api_key = "88f63d75ae40120899216aa75faa6c13";

export const Search = () => {
  async function fetchData(searchTerm: string, page: number) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${api_key}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function renderResults(results: SearchData[]): void {
    const searchResultsElement = document.getElementById("searchResults");
    const noMovies = document.createElement("h1") as HTMLHeadingElement;
    noMovies.classList.add("no-movies");
    noMovies.innerHTML = "Could not find any movies";

    results.length > 0
      ? results.forEach((result) => {
          const loaderDiv = document.createElement("div");
          loaderDiv.classList.add("animated-background");
          const listItem = document.createElement("a");
          setTimeout(() => {
            loaderDiv.appendChild(listItem);
            loaderDiv.classList.remove("animated-background");
          }, 1000);
          listItem.classList.add("movie-img-cont", "search-results-item");
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
            ? `https://image.tmdb.org/t/p/original${
                result.poster_path || result.backdrop_path
              }`
            : "../../assets/imdb-logo.png";

          listItem.append(movieTitle, movieImg);
          searchResultsElement?.appendChild(loaderDiv);
        })
      : searchResultsElement?.append(noMovies);
  }

  (document.getElementById("searchInput") as HTMLInputElement).addEventListener(
    "keypress",
    async (event) => {
      if (event.key === "Enter") {
        const searchTerm = (
          document.getElementById("searchInput") as HTMLInputElement
        ).value;

        if (!searchTerm.trim()) {
          (
            document.getElementById("searchInput") as HTMLInputElement
          ).innerHTML = "";
          return;
        }

        localStorage.setItem("searchTerm", searchTerm);

        const { results } = await fetchData(searchTerm, 1);
        renderResults(results);

        setupInfiniteScroll(async (page: number) => {
          const searchInp = localStorage.getItem("searchTerm") || "";
          const { results } = await fetchData(searchInp, page);
          renderResults(results);
        });

        const location = "/" + window.location.pathname.split("/")[1];
        if (location !== `/search`) {
          window.location.href = `/search/:${searchTerm}`;
        }

        (document.getElementById("searchInput") as HTMLInputElement).value = "";
      }
    }
  );

  document.addEventListener("DOMContentLoaded", async () => {
    const searchInp = localStorage.getItem("searchTerm") || "";

    if (!searchInp.trim()) {
      (document.getElementById("searchInput") as HTMLInputElement).innerHTML =
        "";
      return;
    }

    setupInfiniteScroll(async (page: number) => {
      const searchInp = localStorage.getItem("searchTerm") || "";
      const { results } = await fetchData(searchInp, page);
      renderResults(results);
    });

    const { results } = await fetchData(searchInp, 1);
    renderResults(results);
  });
};

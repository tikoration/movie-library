var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPopularMovies } from "../services/apiMovies.js";
const PopularMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const { results } = yield getPopularMovies();
    const pathIsDetails = location.pathname.includes("movie");
    const sliced = results.slice(0, 6);
    setTimeout(() => {
        const movieLinks = document.querySelectorAll("#randy");
        movieLinks.forEach((movieLink) => {
            movieLink.style.display = "block";
            movieLink.classList.remove("animated-background");
        });
    }, 700);
    return `
  <div class="popular-movies-cont">
  <h2 class="title-popular-movies">Popular Movies</h2>
  <div class="container-for-pop">
${(pathIsDetails ? sliced : results)
        .map((el) => {
        return `
    <div class='animated-background'>
  <a href="/movie/${el.id}"  id='randy' style="display: none" class='movie-link' data-link>
    <div class=" movie-img-cont" id=${el.id}>
    <img  class="movie-img" src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="">

    <div class="movie-imdb-title">
      <div class= "vote-average">
        <img class="imdb" src="/assets/imdb-logo.png"> <span>${el.vote_average
            .toString()
            .slice(0, 3)}</span>
      </div>
      <p>${el.original_title}</p>
    </div>
  </div>
    
  </a>
  </div>
  `;
    })
        .join("")}
</div>
  `;
});
export default PopularMovies;
// padding 50px

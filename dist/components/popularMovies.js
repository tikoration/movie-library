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
import { route } from "../main.js";
const popularsContainer = document.getElementById("populars-container");
export const PopularMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const { results } = yield getPopularMovies();
    console.log(results);
    return `
  <h2>Popular Movies</h2>
  <div class="container-for-pop">
${results.map((el) => {
        return `<div>
  <a href="/details" onclick="${route}">
  <img src="https://image.tmdb.org/t/p/w500/${el.backdrop_path}" alt="">
  </a>
  <div>
  <div>
  <img class="imdb" src="imdb-logo.png"> <span>${el.vote_average}</span>
  </div>
  <p>${el.original_title}</p>
  </div>
  </div>`;
    })}

</div>
  `;
});
// padding 50px

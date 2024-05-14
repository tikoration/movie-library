import { getPopularMovies } from "../services/apiMovies.js";
import { route } from "../main.js";
const popularsContainer = document.getElementById("populars-container");

type Movie = {
  backdrop_path: string;
  vote_average: number;
  original_title: string;
};
export const PopularMovies = async () => {
  const { results } = await getPopularMovies();
  console.log(results);

  return `
  <h2>Popular Movies</h2>
  <div class="container-for-pop">
${results.map((el: Movie) => {
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
};

// padding 50px

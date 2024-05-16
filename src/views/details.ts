import { getMovieById } from "../services/apiMovies.js";
import { getMovieTrailer } from "../services/apiMovies.js";
import PopularMovies from "../components/popularMovies.js";
type Trailer = {
  name: string;
};

export default async function DetailsOfMovie() {
  const url = window.location.pathname;
  const id: string = url.split("/")[2];
  const data = await getMovieById(id);
  const { results: trailer } = await getMovieTrailer(id);

  const someTrailer = trailer[0];

  const officialTrailer = trailer.find(
    (e: Trailer) => e.name === "Official Trailer"
  );

  const hours = Math.floor(data.runtime / 60);
  const min = data.runtime - 60 * hours;

  return `
  <div  class="details-container" >
  <div class="trailer-description">
    <div class="trailer">
      <p class="movie-name">${data.original_title}</p>
       ${
         someTrailer
           ? `
          <iframe   frameborder="0"
          allowfullscreen src="https://www.youtube.com/embed/${
            officialTrailer ? officialTrailer.key : someTrailer.key
          }" class="movie-trailer"></iframe>
          `
           : `<div class="trailer-not-available">Preview is not available❌</div>`
       }
    </div>
    <div class="description">
      <div>
        <div>
          <img class="details-movie-img"  src="https://image.tmdb.org/t/p/w500/${
            data.poster_path
          }"/>
        </div>
        <div>
          <div>
            <p>Release Date :</p>
            <span class="type">${data.release_date}</span>
          </div>
          <div>
            <p>Status :</p>
            <span class="status">${data.status}</span>
          </div>
          <div>
            <p>Studios :</p>
            <span class="studios">${data.production_companies
              .map((e: { name: string }) => e.name)
              .join(", ")}</span>
          </div>
          <div>
            <p>Duration :</p>
            <span class="duration">${hours}h ${min}m</span>
          </div>
          <div>
            <p>Genres :</p>
            <span class="genres"> ${data.genres
              .map((e: { name: string }) => e.name)
              .join(", ")}</span>
          </div>
        </div>
      </div>

      <div>
        <p>description :</p>
        <span class="desc">
  ${data.overview}
        </span>
      </div>
    </div>
  </div>

  <div class="popular-cont-for-details"> 
   ${await PopularMovies()}
   </div>

  </div>
  `;
}

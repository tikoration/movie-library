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

  // if (previewLoader) {
  //   previewLoader.style.height = "300px";
  //   previewLoader.style.width = "300px";
  // }

  setTimeout(() => {
    const previewLoader = document.getElementById("preview-loader");
    const previewFrame = document.getElementById("preview-frame");
    const imgLoader = document.getElementById("img-loader");
    const detailsImg = document.getElementById("details-img");
    const loader = document.querySelectorAll<HTMLElement>("#loader");
    const loaderChild = document.querySelectorAll<HTMLElement>("#loader-child");

    console.log(loader);

    if (
      previewFrame instanceof HTMLElement &&
      previewLoader instanceof HTMLElement &&
      imgLoader instanceof HTMLElement &&
      detailsImg instanceof HTMLElement &&
      loader.length > 0 &&
      loaderChild.length > 0
    ) {
      previewFrame.style.display = "block";
      previewLoader.classList.remove("animated-background");
      detailsImg.style.display = "block";
      imgLoader.classList.remove("animated-background");
      loader.forEach((el, i) => {
        if (
          el instanceof HTMLElement &&
          loaderChild[i] instanceof HTMLElement
        ) {
          loaderChild[i].style.display = "block";
          el.classList.remove("animated-background");
        }
      });
    }
  }, 700);

  return `
  <div  class="details-container">
  <div class="trailer-description">
    <div class="trailer">
      <p class="movie-name">${data.original_title}</p>
       ${
         someTrailer
           ? `
          <div id="preview-loader" class="animated-background" style="width: 100%">
            <iframe id="preview-frame" style="display: none" frameborder="0" 
            allowfullscreen src="https://www.youtube.com/embed/${
              officialTrailer ? officialTrailer.key : someTrailer.key
            }" class="movie-trailer"></iframe>
          </div>
          `
           : `<div class="trailer-not-available">Preview is not available❌</div>`
       }
    </div>
    <div class="description">
      <div>
        <div id="img-loader" class="animated-background">
          <img id="details-img" style="display: none" class="details-movie-img"  src="https://image.tmdb.org/t/p/w500/${
            data.poster_path
          }"/>
        </div>
        <div>
          <div>
            <p>Release Date :</p>
            <div id="loader" class="animated-background" style="height: 10px; width: 100%">
            <span id="loader-child" style="display: none" class="type">${
              data.release_date
            }</span>
            </div>
          </div>
          <div>
            <p>Status :</p>
            <div id="loader" class="animated-background" style="height: 10px; width: 100%">
            <span id="loader-child" style="display: none" class="status">${
              data.status
            }</span>
            </div>
          </div>
          <div>
            <p>Studios :</p>
            <div id="loader" class="animated-background" style="height: 10px; width: 100%">
            <span id="loader-child" style="display: none" class="studios">${data.production_companies
              .map((e: { name: string }) => e.name)
              .join(", ")}</span>
              </div>
          </div>
          <div>
            <p>Duration :</p>
            <div id="loader" class="animated-background" style="height: 10px; width: 100%">
            <span id="loader-child" style="display: none" class="duration">${hours}h ${min}m</span>
            </div>
          </div>
          <div>
            <p>Genres :</p>
            <div id="loader" class="animated-background" style="height: 10px; width: 100%">
            <span id="loader-child" style="display: none" class="genres"> ${data.genres
              .map((e: { name: string }) => e.name)
              .join(", ")}</span>
              </div>
          </div>
        </div>
      </div>

      <div>
        <p>description :</p>
        <div id="loader" class="animated-background" style="height: 10px; width: 100%">
        <span id="loader-child" style="display: none" class="desc">
  ${data.overview}
        </span>
        </div>
      </div>
    </div>
  </div>

  <div class="popular-cont-for-details"> 
   ${await PopularMovies()}
   </div>

  </div>
  `;
}

import { navigateTo } from "../main.js";
const api_key = "88f63d75ae40120899216aa75faa6c13";
const Explore = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
        .then((res) => res.json())
        .then((data) => {
        const movies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path &&
                `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            poster_img: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            description: movie.overview,
        }));
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        if (swiperWrapper) {
            movies.forEach((movie) => {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.innerHTML = `
                  <div data-slide-id="${movie.id}">
                          <div class="movie-t-d">
                              <h1 class="movie-title">${movie.title}</h1>
                              <h4>${movie.description}</h4>
                          </div>
                          <img class="movie-image" src="${movie.img || movie.poster_img}" alt="${movie.title}" />
                  </div>
              `;
                swiperWrapper.appendChild(slide);
            });
            const swiperContainer = new Swiper(".swiper-container", {
                loop: true,
                autoplay: {
                    delay: 7000,
                },
                slidesPerView: 1,
                // spaceBetween: 30,
            });
            swiperContainer.on("click", (_, event) => {
                const id = event.target
                    .closest("[data-slide-id]")
                    .getAttribute("data-slide-id");
                navigateTo(`movie/${id}`);
            });
            const loader = document.getElementById("loader");
            const exploreCont = document.getElementById("explore-cont");
            if (exploreCont) {
                exploreCont.style.display = "none";
            }
            if (loader) {
                loader.style.width = "100%";
                loader.style.height = "400px";
            }
            setTimeout(() => {
                if (loader) {
                    loader.classList.remove("animated-background");
                }
                if (exploreCont) {
                    exploreCont.style.display = "block";
                }
            }, 700);
            const swiperContainerElement = document.querySelector(".swiper-container");
            if (swiperContainerElement) {
                swiperContainerElement.style.display = "block";
            }
        }
    });
    return `
  <div class="explore-t-q">
      <h1 class="explore-title">Explore</h1>
      <h3 class="explore-question">What are you gonna watch today ?</h3>
  </div>
  <div id='loader' class="animated-background">
    <div id="explore-cont">
      <div class="swiper-container hidden" id="help">
          <div class="swiper-wrapper"></div>
      </div>
      </div>
  </div>
  `;
};
export default Explore;

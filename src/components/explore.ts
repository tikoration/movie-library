interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

declare const Swiper: any;
const api_key = "88f63d75ae40120899216aa75faa6c13";
const Explore = () => {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
    .then((res) => res.json())
    .then((data: { results: Movie[] }) => {
      console.log(data);
      const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        img:
          movie.backdrop_path &&
          `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        poster_img: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        description: movie.overview,
      }));

      const swiperContainer = new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
          delay: 7000,
        },
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 30,
      });

      movies &&
        movies.forEach((movie) => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide");
          slide.innerHTML = `
                  <a href="/details/${
                    movie.id
                  }" data-link class="explore-container" id="${movie.id}">
                          <div class="movie-t-d">
                              <h1 class="movie-title">${movie.title}</h1>
                              <h4>${movie.description}</h4>
                          </div>
                          <img class="movie-image" src="${
                            movie.img || movie.poster_img
                          }" alt="${movie.title}" />
                  </a>
              `;
          swiperContainer.appendSlide(slide);
        });
      const loader = document.getElementById("loader");
      const exploreCont = document.getElementById("explore-cont");

      if (exploreCont) {
        exploreCont.style.display = "none";
      }
      if (loader) {
        loader.style.width = "100%";
      }

      setTimeout(() => {
        if (loader) {
          loader.classList.remove("animated-background");
        }
        if (exploreCont) {
          exploreCont.style.display = "block";
        }
      }, 700);
    });

  return `
  <div class="explore-t-q">
      <h1 class="explore-title">Explore</h1>
      <h3 class="explore-question">What are you gonna watch today ?</h3>
  </div>
  <div id='loader' class="animated-background">
    <div id="explore-cont">
      <div class="swiper-container" id="help">
          <div class="swiper-wrapper"></div>
      </div>
      </div>
  </div>
  `;
};
export default Explore;

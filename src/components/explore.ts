interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}
declare const Swiper: any;
const Explore = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=88f63d75ae40120899216aa75faa6c13"
  )
    .then((res) => res.json())
    .then((data: { results: Movie[] }) => {
      const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        img:
          movie.backdrop_path &&
          `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        poster_img: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        description: movie.overview,
      }));
      console.log(movies);
      // Initialize Swiper
      const swiperContainer = new Swiper(".swiper-container", {
        loop: true, // Enable loop mode
        autoplay: {
          delay: 7000, // Delay between slides in milliseconds
        },
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 30,
      });
      // Add slides to Swiper
      movies.forEach((movie) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `
                  <a href="/details" data-link class="explore-container" key="${
                    movie.id
                  }">
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
    });
  return `
  <div class="explore-t-q">
      <h1 class="explore-title">Explore</h1>
      <h3 class="explore-question">What are you gonna watch today ?</h3>
  </div>
      <div class="swiper-container">
          <div class="swiper-wrapper"></div>
      </div>
  `;
};
export default Explore;

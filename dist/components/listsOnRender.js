var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getGenres, getMovieWithGenre } from "../services/apiMovies.js";
export function listsOnRender() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getGenres();
        const genres = data["genres"].map((e) => [e["name"], e["id"]]);
        console.log(genres);
        const randomIndex1 = Math.floor(Math.random() * genres.length);
        const randomIndex2 = Math.floor(Math.random() * genres.length);
        const randomGenre1 = genres[randomIndex1];
        const randomGenre2 = genres[randomIndex2];
        console.log(randomGenre1[0], randomGenre1[1], "first");
        console.log(randomGenre2[0], randomGenre2[1], "sec");
        const data1 = yield getMovieWithGenre(randomGenre1[1], 1);
        const data2 = yield getMovieWithGenre(randomGenre2[1], 1);
        console.log(data1["results"]);
        const container = document.getElementById("r");
        console.log(container);
        // const bla = document.getElementById("blabla");
        // const newH1 = document.createElement("h1");
        // bla?.insertAdjacentElement("afterbegin", newH1);
        // if (randomGenre1) {
        //   newH1.innerText = randomGenre1[0];
        // }
        if (container) {
            const swiperContainer1 = new Swiper(".swiper-container-genre-one", {
                // Use the unique class name here
                //   effect: "slide",
                loop: true,
                //   freeMode: true,
                //   speed: 2000,
                autoplay: {
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    waitForTransition: true,
                    stopOnLastSlide: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, // Set to true to allow clicking on pagination bullets to navigate
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slidesPerView: 5,
                centeredSlides: true,
                spaceBetween: 100,
            });
            data1["results"].map((e) => {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.innerHTML = ` 
      
      <a href="/movie/${e.id}" data-link  class='movie-link'>
        <div class=" movie-img-cont" id=${e.id}>
        <img  class="movie-img" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="">
       <div class="movie-imdb-title">
           <div class= "vote-average">
             <img class="imdb" src="/assets/imdb-logo.png"> <span>${e.vote_average
                    .toString()
                    .slice(0, 3)}</span>
            </div>
           <p>${e.original_title}</p>
         </div>
       </div>
       </a>
        `;
                swiperContainer1.appendSlide(slide);
            });
            const swiperContainer2 = new Swiper(".swiper-container-genre-two", {
                // Use the unique class name here
                //   effect: "slide",
                loop: true,
                //   freeMode: true,
                //   speed: 2000,
                autoplay: {
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    waitForTransition: true,
                    stopOnLastSlide: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, // Set to true to allow clicking on pagination bullets to navigate
                },
                navigation: {
                    nextEl: ".swiper-button-next-sec",
                    prevEl: ".swiper-button-prev-sec",
                },
                slidesPerView: 5,
                centeredSlides: true,
                spaceBetween: 100,
            });
            data2["results"].map((e) => {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.innerHTML = ` 
      
      <a href="/movie/${e.id}" data-link  class='movie-link'>
        <div class=" movie-img-cont" id=${e.id}>
        <img  class="movie-img" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="">
       <div class="movie-imdb-title">
           <div class= "vote-average">
             <img class="imdb" src="/assets/imdb-logo.png"> <span>${e.vote_average
                    .toString()
                    .slice(0, 3)}</span>
            </div>
           <p>${e.original_title}</p>
         </div>
       </div>
       </a>
        `;
                swiperContainer2.appendSlide(slide);
            });
        }
        // console.log(randomGenre1[0], " affafafafafafa");
        return `<div>
    
    <div>
    <div id='blabla'>
  <h1>${randomGenre1[0]}</h1>
    <div class='swiper-container-genre-one' id='r' style='padding-top: 1rem'>
    
    <div class="swiper-wrapper"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  
    </div>
    </div>
    <div>



    <div>
    <div>
    <h1>${randomGenre2[0]}</h1>
    <div class='swiper-container-genre-two'>
    <div class="swiper-wrapper"></div>

    <div class="swiper-button-prev-sec"></div>
    <div class="swiper-button-next-sec"></div>
    </div>

    </div>
    <div>


    </div>`;
    });
}

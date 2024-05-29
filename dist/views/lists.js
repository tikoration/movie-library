var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { listsOnRender } from "../components/listsOnRender.js";
import { getGenres, getMovieWithGenre } from "../services/apiMovies.js";
let functionHasBeenCalled = false;
function activateNumber(c, currentPage) {
    if (c) {
        const children = Array.from(c.children);
        children.forEach((child) => {
            // console.log(child);
            if (child.textContent != String(currentPage)) {
                child.classList.remove("active-number");
            }
            if (child.textContent === String(currentPage)) {
                child.classList.add("active-number");
            }
        });
    }
}
function GENRErator(e, data, currentPage, id) {
    const total = data["total_pages"] > 500 ? 500 : data["total_pages"];
    // console.log(total);
    console.log(currentPage, "from genrerator");
    return `
    <h1>Genre :<span> ${JSON.parse(window.localStorage.getItem("genre"))}</span></h1>
    <div class='genre-movies'>
    ${data["results"]
        .map((e) => {
        return `
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
    })
        .join("")}
    </div>
    <div class='buttons-container'>
    <button onclick ='handlePrev()'><span>&#60;</span></button>
    <div id='pagination-numbers'>
    <span id=${id} class='active-number'>1</span>
    <span id=${id}>${currentPage > 4 ? "..." : "2"}</span>

    ${currentPage < total - 3
        ? `

    <span id=${id}>${currentPage > 4 ? currentPage - 1 : "3"}</span>
    <span id=${id}>${currentPage > 4 ? currentPage : "4"}</span>
    <span id=${id}>${currentPage > 4 ? currentPage + 1 : "5"}</span>
    
    `
        : `
    
    <span id=${id}>${total - 4}</span>
    <span id=${id}>${total - 3}</span>
    <span id=${id}>${total - 2}</span>
    `}


    <span id=${id}>${currentPage >= total - 3 ? total - 1 : "..."}</span>
    
    
    <span id=${id} class='actual-page'>${total}</span>
    </div>
<button onclick='handleNext()'><span>&#62</span></button>
<div>
    `;
}
export function Lists() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getGenres();
        // console.log(data);
        // async  function  B() {
        //   if (!functionHasBeenCalled) {
        //     functionHasBeenCalled = true;
        //     return await listsOnRender();
        //   } else {
        //     return ' '
        //   }
        // }
        console.log("calling");
        const container = document.querySelector(".lists-swiper-container");
        if (container) {
            const swiperContainer = new Swiper(".lists-swiper-container", {
                // Use the unique class name here
                effect: "slide",
                loop: true,
                freeMode: true,
                speed: 3000,
                autoplay: {
                    delay: 0.1,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    waitForTransition: true,
                    stopOnLastSlide: false,
                },
                slidesPerView: 8,
                centeredSlides: true,
            });
            data["genres"].map((e) => {
                // console.log(e);
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.classList.add("swiper-slide-list");
                slide.innerHTML = `<p id=${e["id"]}>${e["name"]}</p>`;
                swiperContainer.appendSlide(slide);
            });
        }
        return `<div class='lists-swiper-container'>
  <div class="swiper-wrapper list-cont"></div>
  <div>
  <div class='genre-movie-container' >
${yield listsOnRender()}
  </div>
  </div>`;
    });
}
document.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    let currentPage = 1;
    const id = e.target.id;
    // console.log(id);
    const genre = e.target.innerText;
    // console.log(genre, "afafaf");
    const container = document.querySelector(".genre-movie-container");
    const containerForNumbers = document.getElementById("pagination-numbers");
    containerForNumbers;
    if (containerForNumbers &&
        e.target.tagName === "SPAN" &&
        Number(e.target.innerText)) {
        const page = Number(e.target.innerText);
        window.localStorage.setItem("page", JSON.stringify(page));
        const id = e.target.id;
        console.log(page, "----id-", id);
        // console.log(id);
        const data = yield getMovieWithGenre(id, page);
        if (container) {
            container.innerHTML = "";
        }
        console.log(data);
        // // console.log(data, "PAGE", e.target.textContent);
        GENRErator(genre, data, page, id);
        if (container) {
            container.innerHTML = GENRErator(genre, data, page, id);
        }
        const c = document.getElementById("pagination-numbers");
        activateNumber(c, page);
    }
    if (e.target.tagName === "P") {
        let data = yield getMovieWithGenre(e.target.id, 1);
        const totalPages = data["total_pages"] < 500 ? data["total_page"] : 500;
        // const id = (e.target as HTMLParagraphElement).id;
        const genre = e.target.innerText;
        window.localStorage.setItem("genre", JSON.stringify(genre));
        localStorage.removeItem("page");
        let genresInnerHTML = GENRErator(genre, data, currentPage, id);
        console.log(genre);
        window.handleNext = function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                //////////
                const pageFromLocal = window.localStorage.getItem("page");
                if (currentPage !== totalPages) {
                    if (!pageFromLocal) {
                        currentPage++;
                    }
                    if (pageFromLocal) {
                        currentPage = Number(pageFromLocal);
                        currentPage++;
                        localStorage.removeItem("page");
                    }
                    data = yield getMovieWithGenre(id, currentPage);
                    if (container)
                        container.innerHTML = "";
                    console.log(data, "PAGE", currentPage);
                    genresInnerHTML = GENRErator(genre, data, currentPage, id);
                    if (container)
                        container.innerHTML = genresInnerHTML;
                    const c = document.getElementById("pagination-numbers");
                    activateNumber(c, currentPage);
                }
            });
        };
        window.handlePrev = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const pageFromLocal = window.localStorage.getItem("page");
                if (!pageFromLocal) {
                    currentPage--;
                }
                if (pageFromLocal) {
                    currentPage = Number(pageFromLocal);
                    currentPage--;
                    localStorage.removeItem("page");
                }
                // if (currentPage > 1) currentPage--;
                data = yield getMovieWithGenre(id, currentPage);
                if (container)
                    container.innerHTML = "";
                console.log(data, "PAGE", currentPage);
                genresInnerHTML = GENRErator(genre, data, currentPage, id);
                if (container)
                    container.innerHTML = genresInnerHTML;
                const c = document.getElementById("pagination-numbers");
                activateNumber(c, currentPage);
            });
        };
        ////////////////
        if (container) {
            container.innerHTML = "";
            container.innerHTML = genresInnerHTML;
        }
    }
}));
window.addEventListener("beforeunload", () => {
    localStorage.clear();
});

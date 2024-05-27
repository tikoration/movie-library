var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "88f63d75ae40120899216aa75faa6c13";
export function getPopularMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchedMovies = yield fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
            if (!fetchedMovies.ok)
                throw new Error("error with accesing data");
            const data = yield fetchedMovies.json();
            // console.log(data);
            return data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getMovieById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchedMovie = yield fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            console.log(fetchedMovie);
            if (!fetchedMovie.ok)
                throw new Error(`there is no movie with id:${id}`);
            const data = yield fetchedMovie.json();
            // console.log(data);
            return data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getMovieTrailer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchTrailer = yield fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
            if (!fetchTrailer.ok)
                throw new Error("problem with accessing movie trailer");
            const data = yield fetchTrailer.json();
            return data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getGenres() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searched = yield fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}
      `);
            if (!searched.ok)
                throw new Error("problem with accessing genres list");
            const data = yield searched.json();
            // console.log(data);
            return data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
export function getMovieWithGenre(id_1) {
    return __awaiter(this, arguments, void 0, function* (id, page = 1) {
        try {
            const fetched = yield fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`);
            if (!fetched.ok)
                throw new Error("no movies were found");
            const data = yield fetched.json();
            return data;
        }
        catch (err) {
            console.error(err);
        }
    });
}

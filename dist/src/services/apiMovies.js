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
            const fetchedMovies = yield fetch(`https://api.themoviedb.org/3/movie/popular?api_key=88f63d75ae40120899216aa75faa6c13`);
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
            if (!fetchedMovie.ok)
                throw new Error(`there is no movie with id:${id}`);
            const data = yield fetchedMovie.json();
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    });
}

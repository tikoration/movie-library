var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_key = '88f63d75ae40120899216aa75faa6c13';
const searchKey = location.pathname.split('/')[2];
export const Search = () => {
    function fetchData(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = 1;
            try {
                const response = yield fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${api_key}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        });
    }
    function renderResults(results) {
        const searchResultsElement = document.getElementById('searchResults');
        if (!searchResultsElement)
            return;
        searchResultsElement.innerHTML = '';
        results.forEach(result => {
            console.log(result);
            const listItem = document.createElement('div');
            listItem.classList.add('search-results-item');
            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title');
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.src = `https://image.tmdb.org/t/p/original${result.poster_path}`;
            movieTitle.innerHTML = result.title;
            listItem.append(movieTitle, movieImg);
            searchResultsElement.appendChild(listItem);
        });
    }
    document.getElementById('searchInput').addEventListener('keypress', (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (event.key === 'Enter') {
            const searchTerm = document.getElementById('searchInput').value;
            // const searchVal = searchTerm == "" ? searchKey : 
            // searchTerm
            if (!searchTerm.trim()) {
                document.getElementById('searchInput').innerHTML = '';
                return;
            }
            const { results } = yield fetchData(searchKey);
            renderResults(results);
            const location = "/" + window.location.pathname.split("/")[1];
            if (location !== `/search`) {
                window.location.href = `/search/:${searchTerm}`;
            }
            document.getElementById('searchInput').value = '';
        }
    }));
};

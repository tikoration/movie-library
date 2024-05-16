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
                console.log(data, 'search');
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
            const listItem = document.createElement('li');
            listItem.textContent = result.title;
            searchResultsElement.appendChild(listItem);
        });
    }
    document.getElementById('searchInput').addEventListener('keypress', (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (event.key === 'Enter') {
            const searchTerm = document.getElementById('searchInput').value;
            if (!searchTerm.trim()) {
                document.getElementById('searchInput').innerHTML = '';
                return;
            }
            const { results } = yield fetchData(searchTerm);
            renderResults(results);
            const location = "/" + window.location.pathname.split("/")[1];
            if (location !== `/search`) {
                window.location.href = `/search/${encodeURIComponent(searchTerm)}`;
            }
            document.getElementById('searchInput').value = '';
        }
    }));
};

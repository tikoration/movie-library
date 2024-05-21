interface SearchData {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}
const api_key='88f63d75ae40120899216aa75faa6c13'

const searchKey = location.pathname.split('/')[2]
export const Search = () =>{
       
        async function fetchData(searchTerm: string){
        const page = 1;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${api_key}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

     function renderResults(results: SearchData[]): void {
        const searchResultsElement = document.getElementById('searchResults');
        const noMovies = document.getElementById('no-movies') as HTMLHeadingElement;

        results.length > 0 ?
        results.forEach(result => {
            const listItem = document.createElement('a');
            listItem.classList.add('search-results-item');
            listItem.href = `/details/${result.id}`;
            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title')
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            const altImg = result.poster_path || result.backdrop_path;
            movieImg.src = altImg ? `https://image.tmdb.org/t/p/original${result.poster_path || result.backdrop_path}` : '../../assets/imdb-logo.png';
            
            console.log(result)
            
            movieTitle.innerHTML = result.title;
            listItem.append(movieTitle, movieImg);
            searchResultsElement?.appendChild(listItem);
        }) : noMovies.innerHTML = 'Could not find any movies'

    }

    (document.getElementById('searchInput') as HTMLInputElement).addEventListener('keypress', async (event) => {
        if(event.key === 'Enter'){
            
            const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;

            if (!searchTerm.trim()) {
                (document.getElementById('searchInput') as HTMLInputElement).innerHTML = '';
                return;
            }
                const {results} = await fetchData(searchTerm);
                renderResults(results);
                const location = "/" + window.location.pathname.split("/")[1];
                if(location !== `/search`){
                    window.location.href = `/search/:${searchTerm}`;
                }

                (document.getElementById('searchInput') as HTMLInputElement).value = '';
        }
    });
    document.addEventListener('DOMContentLoaded', async () => {

        if (!searchKey.trim()) {
            (document.getElementById('searchInput') as HTMLInputElement).innerHTML = '';
            return;
        }

        const {results} = await fetchData(searchKey);
        renderResults(results);

        const location = "/" + window.location.pathname.split("/")[1];
                if(location !== `/search`){
                    window.location.href = `/search/:${searchKey}`;
                }

    })
}
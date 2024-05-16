interface SearchData {
    id: number;
    title: string;
}
const api_key='88f63d75ae40120899216aa75faa6c13'

   export const Search = () =>{

     async function fetchData(searchTerm: string){
        const page = 1;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${api_key}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data,'search')
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
     function renderResults(results: SearchData[]): void {
        const searchResultsElement = document.getElementById('searchResults');
        if (!searchResultsElement) return;

        searchResultsElement.innerHTML = '';
    
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = result.title;
            searchResultsElement.appendChild(listItem);
        });
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
                    window.location.href = `/search/${encodeURIComponent(searchTerm)}`;
                }

                (document.getElementById('searchInput') as HTMLInputElement).value = '';
        }
    });
}
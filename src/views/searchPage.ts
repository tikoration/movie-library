import { getMovieByKey } from "../services/apiMovies.js";

export default async function SearchPage() {
  const inputWord = document.querySelector(".search-bar");
  console.log(inputWord);

  const data = await getMovieByKey();

  return `

  <div>
    <h1>Searched Results:</h1>
    </div>
    </a>
    `;
}

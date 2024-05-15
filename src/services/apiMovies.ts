const API_KEY = "88f63d75ae40120899216aa75faa6c13";

export async function getPopularMovies() {
  try {
    const fetchedMovies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    if (!fetchedMovies.ok) throw new Error("error with accesing data");
    const data = await fetchedMovies.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getMovieById(id: number) {
  try {
    const fetchedMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    if (!fetchedMovie.ok) throw new Error(`there is no movie with id:${id}`);
    const data = await fetchedMovie.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

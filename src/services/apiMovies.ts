const API_KEY = "88f63d75ae40120899216aa75faa6c13";

export async function getPopularMovies() {
  try {
    const fetchedMovies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    if (!fetchedMovies.ok) throw new Error("error with accesing data");
    const data = await fetchedMovies.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getMovieById(id: string) {
  try {
    const fetchedMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    console.log(fetchedMovie);
    if (!fetchedMovie.ok) throw new Error(`there is no movie with id:${id}`);
    const data = await fetchedMovie.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    console.error(err);
  }
}

export async function getMovieTrailer(id: string) {
  try {
    const fetchTrailer = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    if (!fetchTrailer.ok)
      throw new Error("problem with accessing movie trailer");

    const data = await fetchTrailer.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

/////////

//api.themoviedb.org/3/search/movie?query=${key}&page=${page}&api_key=${api_key}
export async function getMovieByKey(key: string) {
  try {
    const searched = await fetch(
      `//api.themoviedb.org/3/search/movie?query=${key}&page=1&api_key=${API_KEY}
      `
    );
    if (!searched.ok) throw new Error("problem with accessing movie trailer");

    const data = await searched.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

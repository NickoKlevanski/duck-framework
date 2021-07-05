export function getDataFromAPI(filmName) {
  // return `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_DB_API_KEY}`;
  // return `https://api.themoviedb.org/3/find/${filmName}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&external_source=imdb_id`;
  return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${filmName}&language=en-US&page=1&include_adult=false`;
}

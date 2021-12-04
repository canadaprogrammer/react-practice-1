import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=rating&limit=20&page=1'
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.log(json.data.movies);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='App'>
      <h1>Movies {loading ? null : movies.length}</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={movie.medium_cover_image} alt={movie.title} />
              <h2>
                {movie.title} ({movie.year}) - {movie.rating}
              </h2>
              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

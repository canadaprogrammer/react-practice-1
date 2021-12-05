import { useState, useEffect } from 'react';
import Movies from '../components/Movies';

function Home() {
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
            <Movies
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
              year={movie.year}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

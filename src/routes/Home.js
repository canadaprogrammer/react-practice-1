import { useState, useEffect } from 'react';
import Movies from '../components/Movies';
import styles from '../components/Movies.module.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = async (page) => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=rating&limit=20&page=${page}`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies(page);
  }, [page]);

  const prevPage = () => {
    if (page > 1) {
      setPage((current) => current - 1);
      setLoading(true);
    }
  };

  const nextPage = () => {
    setPage((current) => current + 1);
    setLoading(true);
  };

  return (
    <div className='App'>
      <h1>
        Movies{' '}
        <span className={styles.pageButtons}>
          <button onClick={prevPage} disabled={page === 1 ? true : false}>
            Prev
          </button>
          {loading ? null : `Page: ${page}`}
          <button onClick={nextPage}>Next</button>
        </span>
      </h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.moviesContainer}>
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

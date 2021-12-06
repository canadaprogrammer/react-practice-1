import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

function Movies({ id, coverImg, title, year, rating, summary, genres }) {
  return (
    <div className={styles.movieWrapper}>
      <div className={styles.image}>
        <img src={coverImg} alt={title} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/movie/${id}`}>
            {title} ({year}) - {rating}
          </Link>
        </h2>
        <p className={styles.summary}>{summary}</p>
        <p>[{genres.reduce((a, b) => `${a}, ${b}`)}]</p>
      </div>
    </div>
  );
}

Movies.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movies;

import PropTypes from 'prop-types';

function Movie({ coverImg, title, year, rating, summary, genres }) {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <img src={coverImg} alt={title} />
      </div>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>
        <strong>Description:</strong> {summary}
      </p>
      <p>
        <strong>Rating:</strong> {rating}
      </p>
      <p>
        <strong>Genres: </strong>
        {genres.reduce((a, b) => `${a}, ${b}`)}
      </p>
    </div>
  );
}

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;

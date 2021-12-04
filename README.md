# Create React App

## Using prop and style

- on Button.module.css

  - ```css
    .btn {
      color: white;
      background-color: tomato;
    }
    ```

- on Button.js

  - ```jsx
    import PropTypes from 'prop-types';
    import styles from './Button.module.css';

    const Button = ({ text }) => {
      return <button className={styles.btn}>{text}</button>;
    };

    Button.propTypes = {
      text: PropTypes.string.isRequired,
    };

    export default Button;
    ```

- on App.js

  - ```jsx
    import Button from './Button';

    function App() {
      return (
        <div className='App'>
          <h1>Hello!!</h1>
          <Button text='Continue' />
        </div>
      );
    }

    export default App;
    ```

## `useEffect(React.EffectCallback, React.DependencyList)`

- By default, effects run after every completed render, but you can choose to fire them only when certain values have changed by using `useEffect()`.

- EffectCallback will be executed when the dependency changed.

- If the dependency is empty, it only runs once.

- ```jsx
  useEffect(() => {
    console.log('It only runs once.');
  }, []);
  // when keyword changed, it's executed.
  useEffect(() => {
    if (keyword !== '' && keyword.length > 5) {
      console.log('Search For: ', keyword);
    }
  }, [keyword]);
  useEffect(() => {
    console.log('It runs when keyword or counter changed.');
  }, [keyword, counter]);
  ```

### Cleaning up an effect

- Clean-up function runs before the component is removed from the UI to prevent memory leaks.

- ```jsx
  function Hello() {
    useEffect(() => {
      console.log('created');
      return () => {
        // clean up function
        console.log('destroyed');
      };
    }, []);
    return <h1>Hello</h1>;
  }
  function App() {
    const [show, setShow] = useState(false);
    const onClick = () => setShow((prev) => !prev);
    return (
      <div className='App'>
        <button onClick={onClick}>{show ? 'Hide' : 'Show'}</button>
        {show ? <Hello /> : null}
      </div>
    );
  }
  ```

# Todo List

- ```jsx
  function App() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const onChange = (event) => setTodo(event.target.value);
    const onSubmit = (event) => {
      event.preventDefault();
      if (todo === '') {
        return;
      }
      setTodos((currentArray) => [todo, ...currentArray]);
      setTodo('');
    };
    return (
      <div className='App'>
        <h1>My ToDos ({todos.length})</h1>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Write your to do...'
            value={todo}
            onChange={onChange}
          />
          <button>Add ToDo</button>
          <hr />
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
  ```

# Coin Tracker

- ```jsx
  const Select = ({ coins }) => {
    return (
      <select>
        {coins.map((coin) => (
          <option value={coin.id}>
            {coin.name} ({coin.symbol}):{' '}
            {Math.round(coin.quotes.USD.price * 100) / 100} USD
          </option>
        ))}
      </select>
    );
  };

  function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
      fetch('https://api.coinpaprika.com/v1/tickers')
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setLoading(false);
        });
    }, []);
    return (
      <div className='App'>
        <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
        {loading ? <strong>Loading...</strong> : <Select coins={coins} />}
      </div>
    );
  }
  ```

# Movie App

## Movie List View

- ```jsx
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
  ```

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

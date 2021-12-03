import Button from './Button';
import styles from './App.module.css';

function App() {
  return (
    <div className='App'>
      <h1 className={styles.title}>Hello!!</h1>
      <Button text='Continue' />
    </div>
  );
}

export default App;

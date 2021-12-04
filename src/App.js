import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  // const todos = document.querySelector('ul');
  const [todos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === '') {
      return;
    }

    setTodos((currentArray) => [todo, ...currentArray]);
    setTodo('');

    // const list = document.createElement('li');
    // list.innerText = todo;
    // todos.appendChild(list);
  };
  console.log(todos);
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

export default App;

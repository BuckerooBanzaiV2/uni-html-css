import React, { useState } from 'react';
import './App.css'; // Falls du Styles hinzufügst

function App() {
  const [todos, setTodos] = useState([]); // Zustand für die Todos
  const [input, setInput] = useState(''); // Zustand für das Textfeld

  // Funktion, um ein Todo hinzuzufügen
  const addTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput(''); // Nach dem Hinzufügen das Textfeld leeren
    }
  };

  // Funktion, um ein Todo zu entfernen
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Todo hinzufügen..."
        />
        <button onClick={addTodo}>Hinzufügen</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Entfernen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

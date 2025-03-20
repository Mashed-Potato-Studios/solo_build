import React, { useState } from 'react';

// A simple counter component
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// A todo item component
function TodoItem({ text, onDelete }) {
  return (
    <div className="todo-item">
      <span>{text}</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// A todo list component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };
  
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <TodoItem 
            key={index} 
            text={todo} 
            onDelete={() => deleteTodo(index)} 
          />
        ))}
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="app">
      <h1>React App Example with Solo Build</h1>
      <p>This is a simple React application demonstrating Solo Build integration.</p>
      
      <div className="components">
        <Counter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

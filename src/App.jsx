import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import azIcon from './assets/a-z.png';
import zaIcon from './assets/z-a.png';

const API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
  'Content-Type': 'application/json'
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);

  const handleApiRequest = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`)
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error
    }
  };

  const fetchData = useCallback(async () => {
    setError(null);

    const url = `${API_URL}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;

    try {
      const data = await handleApiRequest(url, { method: 'GET', headers });
      const todos = data.records.map(todo => ({
        title: todo.fields.title,
        id: todo.id,
        createdTime: todo.fields.createdTime || new Date().toISOString()
      }));
      setTodoList(todos)
    } catch (error) {
      console.error("Error:", error)
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchData()
  }, [sortOrder]);

  const addTodo = async () => {
    if (!todoTitle.trim()) return;

    const newTodo = {
      fields: { title: todoTitle }
    };

    try {
      await handleApiRequest(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(newTodo)
      });
      setTodoTitle('');
      fetchData()
    } catch (error) {
      console.error("Error:", error)
    }
  };

  const removeTodo = async (id) => {
    try {
      await handleApiRequest(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers
      });
      fetchData();
    } catch (error) {
      console.error("Error:", error)
    }
  };

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value)
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/todos"
        element={
          <div className="todo-container">
            <h1>Green Impact</h1>
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <AddTodoForm
                  onAddTodo={addTodo}
                  todoTitle={todoTitle}
                  handleTitleChange={handleTitleChange}
                />  
                <div className="sort-container">
                  <img
                    src={sortOrder === 'asc' ? azIcon : zaIcon}
                    alt="Sort Order"
                    onClick={toggleSortOrder}
                    className="icon-button"
                  />
                </div>
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </>
            )}
          </div>
        }
      />
    </Routes>
  )
};

export default App;
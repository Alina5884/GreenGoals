import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import azIcon from "./assets/a-z.png";
import zaIcon from "./assets/z-a.png";
import homeIcon from "./assets/home.png";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
  "Content-Type": "application/json",
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [tableName] = useState(import.meta.env.VITE_TABLE_NAME);
  const [error, setError] = useState(null);

  const API_URL = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${tableName}`;

  const handleApiRequest = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!tableName) return;

      setIsLoading(true);
      setError(null);

      const url = `${API_URL}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`;

      try {
        const data = await handleApiRequest(url, { method: "GET", headers });

        const todos = data.records.map((todo) => ({
          title: todo.fields.title,
          id: todo.id,
          createdTime: todo.fields.createdTime || new Date().toISOString(),
          completed: todo.fields.completed || false
        }));

        setTodoList(todos);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [sortOrder, tableName]);

  const editTodo = async (updatedTodo) => {
    const updatedTodoData = {
      fields: { title: updatedTodo.title },
    };
  
    try {
      const response = await handleApiRequest(`${API_URL}/${updatedTodo.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedTodoData),
      });
  
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, title: response.fields.title } : todo
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTodo = async (todoTitle) => {
    if (!todoTitle.trim()) return;

    const newTodo = {
      fields: { title: todoTitle },
    };

    try {
      const response = await handleApiRequest(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(newTodo),
      });

      const addedTodo = {
        title: response.fields.title,
        id: response.id,
        createdTime: response.createdTime || new Date().toISOString(),
      };

      setTodoList((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await handleApiRequest(`${API_URL}/${id}`, {
        method: "DELETE",
        headers,
      });
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onToggleComplete = async (id, currentStatus) => {
    const updatedTodoData = {
      fields: { completed: !currentStatus },
    };
  
    try {
      const response = await handleApiRequest(`${API_URL}/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(updatedTodoData),
      });
  
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: response.fields.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/todos"
        element={
          <div className="todo-container">
            <h1>{tableName}</h1>
            {error && <p className="error-message">Error: {error}</p>}
            {/* {isLoading ? (
              <p>Loading...</p>
            ) : ( */}
              <>
                <AddTodoForm
                  onAddTodo={addTodo}
                />
                <div className="sort-container">
                  <img
                    src={sortOrder === "asc" ? azIcon : zaIcon}
                    alt="Sort Order"
                    onClick={toggleSortOrder}
                    className="icon-button"
                  />
                </div>
                <TodoList 
                  todoList={todoList} 
                  onRemoveTodo={removeTodo} 
                  onEditTodo={editTodo}
                  onToggleComplete={onToggleComplete}
                  />
                <Link to="/">
                  <img src={homeIcon} alt="Home" className="home-icon" />
                </Link>
              </>
          </div>
        }
      />
    </Routes>
  );
}

export default App;

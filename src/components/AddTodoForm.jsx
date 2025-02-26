import style from './AddTodoForm.module.css';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';
import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value)
    };

    const handleAddTodo = async (event) =>  {
        event.preventDefault();

        if (!todoTitle.trim()) return;

        onAddTodo(todoTitle)
        setTodoTitle("")
    };

    return (
        <div>
            <h2>Add Eco Task:</h2>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    id="todoTitle" 
                    todoTitle={todoTitle} 
                    handleTitleChange={handleTitleChange} 
                >
                </InputWithLabel>
                <button type="submit" className={style.AddButton}>
                    GO GREEN
                </button>
            </form>
        </div>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;

import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo, todoTitle, handleTitleChange, isLoading }) {
    const handleAddTodo = async (event) =>  {
        event.preventDefault();

        if (!todoTitle.trim()) return;
        
        await onAddTodo(todoTitle);

        handleTitleChange({ target: { value: '' } });
    };

    return (
        <div>
            <h2>Add Todo</h2>
            <form onSubmit={handleAddTodo}>
                <InputWithLabel
                    id="todoTitle" 
                    todoTitle={todoTitle} 
                    handleTitleChange={handleTitleChange} 
                >
                    Title
                </InputWithLabel>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Addidg...' : 'Add'}
                </button>
            </form>
        </div>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default AddTodoForm;

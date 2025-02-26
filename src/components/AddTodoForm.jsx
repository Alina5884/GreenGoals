import style from './AddTodoForm.module.css';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';
import addIcon from '../assets/go-green.png';

function AddTodoForm({ onAddTodo, todoTitle, handleTitleChange, isLoading }) {
    const handleAddTodo = async (event) =>  {
        event.preventDefault();

        if (!todoTitle.trim()) return;
        
        await onAddTodo(todoTitle);

        handleTitleChange({ target: { value: '' } });
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
                <button type="submit" disabled={isLoading} className={style.AddButton}>
                    <img src={addIcon} alt="Add Todo" className={style.AddIcon} />
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

import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import trashIcon from '../assets/trash.png';

const TodoListItem = ({ todo, onRemoveTodo }) => {
    return (
        <li className={style.ListItem}>
            {todo.title}
            <button 
                type="button" 
                onClick={() => onRemoveTodo(todo.id)} 
                className={style.DeleteButton}
            >
                <img src={trashIcon} alt="Delete" className={style.TrashIcon} />
            </button>
        </li>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired
};

export default TodoListItem;
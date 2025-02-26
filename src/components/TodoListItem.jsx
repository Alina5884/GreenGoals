import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import trashIcon from '../assets/trash.png';
import yesIcon from '../assets/yes.png';
import noIcon from '../assets/no.png';
import editIcon from '../assets/edit.png';
import { useState } from 'react';

const TodoListItem = ({ todo, onRemoveTodo, onEditTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onEditTodo({ ...todo, title: newTitle });
    setIsEditing(false);
  };

  return (
    <li className={style.ListItem}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={style.EditInput}
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <div className="Actions">
        <div className="YesOrNo">
            {isEditing ? (
            <>
                <button
                type="button"
                onClick={handleSave}
                className={style.SaveButton}
                >
                <img src={yesIcon} alt="Yes" className={style.YesIcon} />
                </button>
                <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={style.CancelButton}
                >
                <img src={noIcon} alt="No" className={style.NoIcon} />
                </button>
            </>
            ) : (
            <>
                <button
                type="button"
                onClick={() => onRemoveTodo(todo.id)}
                className={style.DeleteButton}
                >
                <img src={trashIcon} alt="Delete" className={style.TrashIcon} />
                </button>
                <button
                type="button"
                onClick={handleEditToggle}
                className={style.EditButton}
                >
                <img src={editIcon} alt="Edit" className={style.EditIcon} />
                </button>
            </>
            )}
        </div>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired 
};

export default TodoListItem;
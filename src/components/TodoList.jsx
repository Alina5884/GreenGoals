import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo, onEditTodo }) => {
    return (
        <div>
            <ul>
                {todoList.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo}
                        onRemoveTodo={onRemoveTodo} 
                        onEditTodo={onEditTodo}
                        />
                ))}
            </ul>
        </div>
    );
};

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired 
};

export default TodoList;
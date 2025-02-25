import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, id, children }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.focus()
        }
    }, []);
    
    return (
        <>
          <label htmlFor={id}>{children}</label>
            <input
                type="text" 
                id={id}
                name={id}
                value={todoTitle} 
                onChange={handleTitleChange} 
                required
                ref={inputRef}
            />
        </>
    )
};

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default InputWithLabel;
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({items, onToggle}) => {
    return (
        <div className='todolist-main'>
            <ul className='list-items'>
                {items.map((elem, index) => {
                    return (
                        <TodoItem
                            elem={elem}
                            index={index}
                            key={elem.id}
                            onClick={onToggle}
                        />
                    );
                })}
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default TodoList;

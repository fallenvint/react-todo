import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
    return (
        <div className='todolist-main'>
            <ul id='todolist' className='list-items'>
                {props.items.map((elem, index) => {
                    return (
                        <TodoItem
                            elem={elem}
                            index={index}
                            key={elem.id}
                            onClick={props.onToggle}
                    />
                    )
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

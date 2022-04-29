import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import {faCheck, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


function TodoItem({elem, onClick}) {
    const {removeTodo} = useContext(Context);

    return (
        <li className={`list-item flex ${elem.status ? 'checked' : ''}`}>
            <span
                className='task-check'
                onClick={() => onClick(elem.id)}
            >
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className='task-info flex_order'>{elem.description}</span>
            <span className='task-date'>{elem.date}</span>
            <span
                className='task-delete'
                onClick={() => removeTodo(elem.id)}
            >
                <FontAwesomeIcon icon={faTrashAlt}/>
            </span>
        </li>
    )
}

TodoItem.propTypes = {
    elem: PropTypes.object.isRequired,
    index: PropTypes.number,
    onClick: PropTypes.func.isRequired
}

export default TodoItem;

import React, {useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import {faCheck, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TodoItem = ({elem, onClick}) => {
    const {removeTodo} = useContext(Context);
    const handleCheck = useCallback(() => onClick(elem.id), [onClick, elem.id]);
    const handleRemove = useCallback(() => removeTodo(elem.id), [removeTodo, elem.id]);

    let classNames = require('classnames');
    let listClass = classNames({
        'list-item flex': true,
        checked: elem.status
    });

    return (
        <li className={listClass}>
            <span className='task-check' onClick={handleCheck}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className='task-info flex_order'>{elem.description}</span>
            <span className='task-date'>{elem.date}</span>
            <span className='task-delete' onClick={handleRemove}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </span>
        </li>
    )
}

TodoItem.propTypes = {
    elem: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default TodoItem;

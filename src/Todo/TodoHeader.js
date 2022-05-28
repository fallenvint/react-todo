import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SwitchCase = (value) => {
    let task = value.value;

    switch (true) {
        case !task:
            return 'Нет задач';
        case (task !== 11 && task % 10 === 1):
            return `${task} Задача`;
        case (task !== 12 && task % 10 === 2):
        case (task !== 13 && task % 10 === 3):
        case (task !== 14 && task % 10 === 4):
            return `${task} Задачи`;
        default:
            return `${task} Задач`;
    }
};

const TodoHeader = ({items, date, onCreate}) => {
    const [isDisplay, setDisplay] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleToggleClass = useCallback(() => {
        setDisplay(!isDisplay);
    }, [isDisplay]);

    const handleAddTask = useCallback(() => {
        if (inputValue === '') {
            alert('Поле не заполнено, добавьте задачу!');
        } else {
            let compare = false;

            items.forEach((element, index) => {
                if (inputValue.toLowerCase().localeCompare( items[index].description.toLowerCase()) === 0) {
                    compare = true;
                }
            });

            if (compare) {
                alert('Такая задача уже есть в списке!');
            } else {
                onCreate(inputValue);
                setInputValue('');
            }
        }
    }, [items, onCreate, inputValue]);

    return (
        <div className={
            cn('todolist-header flex', {
                'show_add-input': isDisplay
            })
        }>
            <div className="today">
                <div className="today_date">{`${date.monthName()} ${date.day}, ${date.year}`}</div>
                <div className="today_week">{date.weekday()}</div>
            </div>
            <div className="task-count">
                <SwitchCase value={items.length} />
            </div>
            <span className='add-input_open' onClick={handleToggleClass}>+</span>
            <div className='add-input flex'>
                <span className='add-input_close' onClick={handleToggleClass}>
                    <FontAwesomeIcon icon={faWindowClose}/>
                </span>
                <div className='input-group'>
                    <input type='text' id='task' className='input-form' placeholder='Задача' value={inputValue} onChange={event => setInputValue(event.target.value)}/>
                    <div className='input-group-btn'>
                        <span id='add_btn' className='button' onClick={handleAddTask}>Добавить</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

TodoHeader.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    date: PropTypes.object,
    onCreate: PropTypes.func.isRequired
}

export default TodoHeader;

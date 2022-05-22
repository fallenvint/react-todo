import React, {useState, useEffect, useCallback} from 'react';
import TodoHeader from './Todo/TodoHeader';
import TodoList from './Todo/TodoList';
import Context from './context';

const currentDate = new Date();
const date = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: String(currentDate.getDate()).padStart(2, '0'),
    weekday: function () {
        const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return weekdays[currentDate.getDay()];
    },
    monthName: function () {
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return months[this.month];
    }
}

const App = () => {
    let [items, setItems] = useState(localStorage.getItem('todo-lists') ? JSON.parse(localStorage.getItem('todo-lists')) : []);

    const handleToggleTodo = useCallback( (id) => {
        setItems(
            items.map(item => {
                if (item.id === id) {
                    item.status = !item.status;
                }
                return item;
            })
        );
    }, [items]);

    const removeTodo = useCallback((id) => {
        setItems(items.filter(item => item.id !== id));
    }, [items]);

    const handleAddTodo = useCallback( (description) => {
        setItems(items.concat([{
            id: Date.now(),
            description: description,
            date: `${date.day}/${String(date.month + 1).padStart(2, '0')}/${date.year}`,
            status: false
        }]));
    },[items]);

    useEffect(() => {
        localStorage.setItem('todo-lists', JSON.stringify(items));
    }, [items]);

    return (
        <Context.Provider value={{removeTodo}}>
            <section>
                <div className='container flex'>
                    <div className='todolist'>
                        <TodoHeader items={items} date={date} onCreate={handleAddTodo}/>
                        <TodoList items={items} onToggle={handleToggleTodo}/>
                    </div>
                </div>
            </section>
        </Context.Provider>
    );
}

export default App;

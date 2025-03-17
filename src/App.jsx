import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';


function RefExample() {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Введіть текст..." />
            <button onClick={handleClick}>Фокус на поле</button>
        </div>
    );
}


function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-content">
                <p>Це модальне вікно!</p>
                <button onClick={onClose}>Закрити</button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

function PortalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Відкрити модальне вікно</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}


const users = [
    { name: 'Олег', age: 30 },
    { name: 'Марія', age: 25 },
    { name: 'Іван', age: 35 }
];

function UserList() {
    return (
        <ul>
            {users.map((user, index) => (
                <React.Fragment key={index}>
                    <li>{user.name} - {user.age} років</li>
                </React.Fragment>
            ))}
        </ul>
    );
}


function TaskList() {
    const tasks = [
        'Завдання 1',
        'Завдання 2',
        'Завдання 3'
    ];
    const [selectedTask, setSelectedTask] = useState(null);
    const firstTaskRef = useRef(null);

    const handleOpenModal = (task) => {
        setSelectedTask(task);
        setTimeout(() => firstTaskRef.current?.focus(), 0);
    };

    return (
        <>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} ref={index === 0 ? firstTaskRef : null}>
                        <button onClick={() => handleOpenModal(task)}>{task}</button>
                    </li>
                ))}
            </ul>

            {selectedTask && ReactDOM.createPortal(
                <div className="modal">
                    <div className="modal-content">
                        <h3>Детальна інформація</h3>
                        <p>{selectedTask}</p>
                        <button onClick={() => setSelectedTask(null)}>Закрити</button>
                    </div>
                </div>,
                document.getElementById('modal-root')
            )}
        </>
    );
}


function App() {
    return (
        <div>
            <h1>React Concepts Demo</h1>
            <RefExample />
            <PortalExample />
            <UserList />
            <TaskList />
        </div>
    );
}

export default App;

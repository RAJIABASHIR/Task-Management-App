import React, { useState, useEffect } from 'react';

const mockData = [
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description 3', priority: 'low', status: 'Completed' },
];

const TaskList = ({ setSelectedTask, fetchTasks }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(mockData); 
    }, []);

    const handleEdit = (task) => {
        setSelectedTask(task);  
    };

    const handleDelete = (id) => {
        console.log('Task deleted:', id);
        fetchTasks(); 
    };

    return (
        <div className="task-list">
            <h2>Task List</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
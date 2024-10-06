import React, { useState, useEffect } from 'react';

const TaskForm = ({ fetchTasks, existingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('To Do'); 
    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description);
            setPriority(existingTask.priority);
            setStatus(existingTask.status); 
        } else {
            setTitle('');
            setDescription('');
            setPriority('low');
            setStatus('To Do'); 
        }
    }, [existingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, priority, status }; 
        console.log('Task submitted:', newTask);
        fetchTasks(); 
        setTitle('');
        setDescription('');
        setPriority('low');
        setStatus('To Do'); 
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{existingTask ? 'Update Task' : 'Create Task'}</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">{existingTask ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
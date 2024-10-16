import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/tasks'; 

const TaskForm = ({ task, onTaskCreate, onTaskUpdate, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('To Do'); 

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority || 'medium');
            setStatus(task.status || 'To Do');
        } else {

            setTitle('');
            setDescription('');
            setPriority('medium');
            setStatus('To Do');
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, priority, status };

        try {
            if (task) {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                if (!response.ok) {
                    throw new Error('Failed to update the task');
                }

                onTaskUpdate(task.id, taskData);
            } else {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                if (!response.ok) {
                    throw new Error('Failed to create the task');
                }

                const newTask = await response.json();
                onTaskCreate(newTask); 
            }

            setTitle('');
            setDescription('');
            setPriority('medium'); 
            setStatus('To Do'); 
        } catch (error) {
            console.error(error.message);
            alert(error.message); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label htmlFor="priority">Priority:</label>
            <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <label htmlFor="status">Status:</label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
            {task && <button type="button" onClick={onCancelEdit}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
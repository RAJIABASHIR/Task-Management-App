import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../services/apiService'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium'); 
    const [status, setStatus] = useState('To Do'); 

    useEffect(() => {
        const getTasks = async () => {
            const tasks = await fetchTasks();
            setTasks(tasks);
        };
        getTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const taskData = { title, description, priority, status }; 

        await createTask(taskData); 
        const updatedTasks = await fetchTasks(); 
        setTasks(updatedTasks); 

        setTitle('');
        setDescription('');
        setPriority('medium'); 
        setStatus('To Do'); 
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId); 
        const updatedTasks = await fetchTasks(); 
        setTasks(updatedTasks); 
    };

    return (
        <div>
            <h2>Task List</h2>
            <form onSubmit={handleCreateTask}>
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
                
                {/* Priority dropdown */}
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

                {/* Status dropdown */}
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

                <button type="submit">Create Task</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
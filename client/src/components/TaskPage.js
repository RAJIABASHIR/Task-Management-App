import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/apiService';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasks();
            setTasks(data);
        };

        loadTasks();
    }, []);

    
    const handleCreateTask = async (taskData) => {
        await createTask(taskData);
        const data = await fetchTasks();  
        setTasks(data);
    };

    
    const handleUpdateTask = async (taskId, updatedTaskData) => {
        await updateTask(taskId, updatedTaskData);
        const data = await fetchTasks();  
        setTasks(data);
        setSelectedTask(null);  
    };

    
    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        const data = await fetchTasks();  
        setTasks(data);
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);  
    };

    const handleCancelEdit = () => {
        setSelectedTask(null);  
    };

    return (
        <div>
            <h2>Task Management</h2>
            
            <TaskForm
                task={selectedTask}
                onTaskCreate={handleCreateTask}
                onTaskUpdate={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
            />
            
            <TaskList
                tasks={tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
};

export default TaskPage;
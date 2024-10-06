import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskPage = () => {
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchTasks = () => {
        console.log('Fetching tasks...');
    };

    return (
        <div className="task-page">
            <TaskForm fetchTasks={fetchTasks} existingTask={selectedTask} />
            <TaskList setSelectedTask={setSelectedTask} fetchTasks={fetchTasks} />
        </div>
    );
};

export default TaskPage;
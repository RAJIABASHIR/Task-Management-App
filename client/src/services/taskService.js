const API_URL = 'http://localhost:3000/api/tasks';  
export const getTasks = async () => {
    return [
        { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', status: 'To Do' },
        { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', status: 'In Progress' },
        { id: 3, title: 'Task 3', description: 'Description 3', priority: 'low', status: 'Completed' },
    ];
};
export const createTask = async (task) => {
    console.log('Mock creating task:', task);
};
export const updateTask = async (id, task) => {
    console.log('Mock updating task:', id, task);
};
export const deleteTask = async (id) => {
    console.log('Mock deleting task:', id);
};
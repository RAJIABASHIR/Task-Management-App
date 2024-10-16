const API_URL = 'http://localhost:3000/api'; 


export const signup = async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); // Store JWT token
    }
    return data;
};

export const logout = () => {
    localStorage.removeItem('token'); // Remove JWT token from localStorage
};

export const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const createTask = async (taskData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const updateTask = async (taskId, taskData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

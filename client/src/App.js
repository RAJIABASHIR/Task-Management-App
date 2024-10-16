import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import TaskList from './components/TaskList';
import { logout } from './services/apiService';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); 
    };

    const handleLogout = () => {
        logout(); 
        setIsLoggedIn(false); 
    };

    return (
        <div>
            <h1>Task Management System</h1>
            {!isLoggedIn ? (
                <>
                    <Signup />
                    <Login onLoginSuccess={handleLoginSuccess} />
                </>
            ) : (
                <>
                    <Logout onLogout={handleLogout} />
                    <TaskList />
                </>
            )}
        </div>
    );
};

export default App;
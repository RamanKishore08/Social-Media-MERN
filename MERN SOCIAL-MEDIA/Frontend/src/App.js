import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login';
import Navigation from './Components/Navigation';
import './App.css'; 

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userCredential) => {
        setUser(userCredential.user);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <div className="app">
                {user ? (
                    <Navigation onLogout={handleLogout} />
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </Router>
    );
}

export default App;

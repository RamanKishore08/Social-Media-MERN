import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import Home from './Home';
import CreatePost from './CreatePost';
import './Navigation.css';

function Navigation({ onLogout }) {
    const [currentPage, setCurrentPage] = useState('home');

    const handleLogout = () => {
        auth.signOut().then(() => {
            onLogout();
        });
    };

    const renderContent = () => {
        if (currentPage === 'home') {
            return <Home />;
        } else if (currentPage === 'createPost') {
            return <CreatePost />;
        }
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="#" onClick={() => setCurrentPage('home')}>Home</Link>
                <Link to="#" onClick={() => setCurrentPage('createPost')}>Create Post</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default Navigation;

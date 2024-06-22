import React from 'react';
import './LogoutButton.css'

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', { method: 'GET' });
            if (response.ok) {
                console.log('Logged out successfully');
                window.location.href = '/login'; // Redirect to login or home page after logout
            } else {
                throw new Error('Failed to log out');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button id="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;


// Frontend: ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    return children; // Render the child components if authenticated
};

export default ProtectedRoute;

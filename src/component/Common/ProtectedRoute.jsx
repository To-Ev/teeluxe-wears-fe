import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {

    const { user, token } = useSelector(state => state.auth);

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If roles are required, check membership
    if (roles && !Object.values(user.roles).includes(roles)) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}

export default ProtectedRoute
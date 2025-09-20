import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    // This hook subscribes the component to the Redux store
    const role = useSelector((state) => state.auth.role);

    // This logic checks the current state from Redux
    // If the role is 'admin', it allows access. Otherwise, it redirects.
    return role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { BiLogOut } from 'react-icons/bi';

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // You can fetch admin-specific data here if needed in the future
    const adminEmail = localStorage.getItem("email") || 'admin@example.com';
    const adminUsername = localStorage.getItem("username") || 'admin';

    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        navigate("/");
    };

    const activeLinkStyle = { backgroundColor: '#18181b' }; // zinc-900

    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full text-zinc-100">
            <div className="flex items-center flex-col justify-center text-center">
                <img src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" className="h-24 w-24 rounded-full" alt="Admin Avatar" />
                <h2 className="mt-4 text-xl font-semibold">{adminUsername}</h2>
                <span className="mt-1 text-normal text-zinc-400">{adminEmail}</span>
            </div>

            <div className="w-full mt-8 flex flex-col gap-2">
                <NavLink
                    to="/admin/all-orders"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="w-full py-2 text-center font-semibold hover:bg-zinc-900 rounded transition-all"
                >
                    All Orders
                </NavLink>
                <NavLink
                    to="/admin/add-book"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="w-full py-2 text-center font-semibold hover:bg-zinc-900 rounded transition-all"
                >
                    Add Book
                </NavLink>
            </div>

            <button
                className="bg-zinc-900 w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-red-700 transition-all"
                onClick={handleLogout}
            >
                Log Out
                <BiLogOut className="ms-2 text-xl" />
            </button>
        </div>
    );
};

export default AdminSidebar;
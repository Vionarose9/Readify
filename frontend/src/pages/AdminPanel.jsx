

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Profile/AdminSidebar'; // We will create this next

const AdminPanel = () => {
    return (
        <div className="bg-zinc-900 px-2 md:px-12 py-8 flex flex-col md:flex-row gap-8 min-h-screen">
            <div className="w-full md:w-1/6">
                <AdminSidebar />
            </div>
            <div className="w-full md:w-5/6">
                {/* Child admin routes (like AddBook, AllOrders) will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;
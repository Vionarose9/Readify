import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import Sidebar from '../components/Profile/Sidebar';
import axiosInstance from '../api/axiosInstance'; // Import the new instance

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null); // Use null as initial state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get('/get-user-information');
                setProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        navigate("/");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
                <p className="text-3xl">Loading Profile...</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 px-2 md:px-12 py-8 flex flex-col md:flex-row gap-8 min-h-screen">
            <div className="w-full md:w-1/6">
                {/* Pass the fetched profile data and logout handler to the Sidebar */}
                <Sidebar data={profile} onLogout={handleLogout} />
            </div>
            <div className="w-full md:w-5/6">
                {/* This is where the Favourites, OrderHistory, etc., will be rendered */}
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;
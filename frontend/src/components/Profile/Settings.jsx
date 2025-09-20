import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../Loader/Loader';

const Settings = () => {
    // We need two states: one for the full, non-editable profile data,
    // and one for the editable address field.
    const [profileData, setProfileData] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch the user's current information when the component loads
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/get-user-information');
                setProfileData(response.data);
                // Pre-fill the address state with the fetched address
                setAddress(response.data.address);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle the form submission to update the address
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        try {
            // Call the backend API to update the address
            const response = await axiosInstance.put('/update-address', { address });
            alert(response.data.message); // Show success message from the backend
        } catch (error) {
            console.error("Failed to update address:", error);
            alert(error.response?.data?.message || "An error occurred.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader />
            </div>
        );
    }

    return (
        <div className="text-white">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <div className="mt-8 bg-zinc-800 p-8 rounded">
                <form onSubmit={handleUpdate}>
                    {/* Username and Email (non-editable) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="username" className="text-zinc-400">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full mt-2 p-2 bg-zinc-700 rounded text-zinc-300 cursor-not-allowed"
                                value={profileData?.username || ''}
                                disabled // Make the field non-editable
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-zinc-400">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full mt-2 p-2 bg-zinc-700 rounded text-zinc-300 cursor-not-allowed"
                                value={profileData?.email || ''}
                                disabled // Make the field non-editable
                            />
                        </div>
                    </div>

                    {/* Address (editable) */}
                    <div className="mt-8">
                        <label htmlFor="address" className="text-zinc-400">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            rows="5"
                            className="w-full mt-2 p-2 bg-zinc-700 rounded text-zinc-100"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} // Update the address state on change
                        />
                    </div>

                    {/* Update Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-500 text-zinc-900 font-semibold py-2 px-6 rounded hover:bg-yellow-600 transition-all"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
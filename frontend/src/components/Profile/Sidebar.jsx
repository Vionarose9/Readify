import React from "react";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ data, onLogout }) => {
    if (!data) {
        return null; // Don't render if data is not available yet
    }

    const activeLinkStyle = {
        backgroundColor: '#18181b', // zinc-900
    };

    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full text-zinc-100">
            <div className="flex items-center flex-col justify-center text-center">
                <img src={data.avatar} className="h-24 w-24 rounded-full" alt="User Avatar" />
                {/* Use 'username' from your user model */}
                <h2 className="mt-4 text-xl font-semibold">{data.username}</h2>
                <span className="mt-1 text-normal text-zinc-400">{data.email}</span>
            </div>

            <div className="w-full mt-8 flex flex-col gap-2">
                <NavLink
                    to="/profile"
                    end
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="w-full py-2 text-center font-semibold hover:bg-zinc-900 rounded transition-all"
                >
                    Favourites
                </NavLink>
                <NavLink
                    to="/profile/orderhistory"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="w-full py-2 text-center font-semibold hover:bg-zinc-900 rounded transition-all"
                >
                    Order History
                </NavLink>
                <NavLink
                    to="/profile/setting"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="w-full py-2 text-center font-semibold hover:bg-zinc-900 rounded transition-all"
                >
                    Settings
                </NavLink>
            </div>

            <button
                className="bg-zinc-900 w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-red-700 transition-all"
                onClick={onLogout}
            >
                Log out
                <BiLogOut className="ms-2 text-xl" />
            </button>
        </div>
    );
};

export default Sidebar;
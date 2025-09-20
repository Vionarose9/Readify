import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get both login status and role from Redux store
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userRole = useSelector((state) => state.auth.role); // Add this line

    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        navigate("/");
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Update navLinks to include admin-specific links
    const navLinks = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        ...(isLoggedIn && userRole === "admin" 
            ? [
                { title: "Admin Panel", link: "/admin" }
              ]
            : []),
        ...(isLoggedIn && userRole === "user" 
            ? [
                { title: "Cart", link: "/cart" },
                { title: "Profile", link: "/profile" }
              ] 
            : []),
    ];

    const activeLinkStyle = {
        borderBottom: '2px solid #3b82f6',
    };

    const AuthLinks = ({ isMobile = false }) => (
        isLoggedIn ? (
            <button
                onClick={handleLogout}
                className={isMobile
                    ? "w-full text-center py-2 bg-red-600 rounded hover:bg-red-700"
                    : "px-4 py-2 bg-red-600 rounded hover:bg-red-700 font-semibold transition-all"
                }
            >
                LogOut
            </button>
        ) : (
            <div className={isMobile ? "w-full flex flex-col gap-4 items-center" : "flex items-center gap-4"}>
                <Link
                    to="/login"
                    onClick={() => isMobile && toggleMenu()}
                    className={isMobile
                        ? "w-full text-center py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800"
                        : "px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all"
                    }
                >
                    LogIn
                </Link>
                <Link
                    to="/signup"
                    onClick={() => isMobile && toggleMenu()}
                    className={isMobile
                        ? "w-full text-center py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800"
                        : "px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all"
                    }
                >
                    SignUp
                </Link>
            </div>
        )
    );

    return (
        <header className="bg-zinc-800 text-white sticky top-0 z-50">
            <div className="flex px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">Readify</h1>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((item) => (
                        <NavLink
                            to={item.link}
                            key={item.link}
                            className="hover:text-blue-500 transition-all duration-300"
                            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                    <AuthLinks />
                </div>

                <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
                    {isMenuOpen ? <AiOutlineClose /> : <FaGripLines />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-zinc-800 flex flex-col items-center gap-4 py-4 px-4">
                    {navLinks.map((item) => (
                        <NavLink
                            to={item.link}
                            key={item.link}
                            className="w-full text-center py-2 hover:bg-zinc-700 rounded transition-all"
                            onClick={toggleMenu}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                    <AuthLinks isMobile={true} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
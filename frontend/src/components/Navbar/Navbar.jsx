import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Define links based on authentication status
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    ...(isLoggedIn
      ? [
          { title: "Cart", link: "/cart" },
          { title: "Profile", link: "/profile" },
        ]
      : []),
  ];

  // Auth links can be separate for clarity
  const authActionLinks = !isLoggedIn ? (
    <>
      <Link
        to="/LogIn"
        className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
      >
        LogIn
      </Link>
      <Link
        to="/SignUp"
        className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
      >
        SignUp
      </Link>
    </>
  ) : (
    <Link
        to="/Logout" // Example: Add a logout button if logged in
        className="px-4 py-2 bg-red-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
      >
        LogOut
      </Link>
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* --- DESKTOP MENU --- */}
      <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <div className="flex items-center">
          {/* ... Logo ... */}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
          {authActionLinks}
        </div>

        <button
          className="md:hidden text-white text-2xl hover:text-zinc-200"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <AiOutlineClose /> : <FaGripLines />}
        </button>
      </div>
      
      {/* --- MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800 text-white flex flex-col items-center gap-4 py-4">
            {navLinks.map((item, i) => (
              <Link to={item.link} className="w-full text-center py-2 hover:bg-zinc-700" key={i} onClick={toggleMenu}>
                {item.title}
              </Link>
            ))}
            {/* You would also need to render the auth action links here for mobile */}
        </div>
      )}
    </>
  );
};

export default Navbar;
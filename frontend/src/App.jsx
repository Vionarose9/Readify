import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
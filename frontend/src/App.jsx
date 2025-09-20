import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; // Removed useSelector as it's not needed here anymore
import { authActions } from "./store/auth";

// --- Main Page & Component Imports ---
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import UpdateBook from "./pages/UpdateBook";
// --- Profile Child Route Imports ---
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";

// --- Admin Route Imports ---
import AdminRoute from "./components/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import AddBook from "./pages/AddBook";
import AllOrders from "./pages/AllOrders"; // --- FIX: Added missing import ---

const App = () => {
    const dispatch = useDispatch();

    // This useEffect hook correctly handles persistent login.
    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (id && token && role) {
            dispatch(authActions.login());
            dispatch(authActions.changeRole(role));
        }
    }, [dispatch]);

    return (
        <div className="bg-zinc-900 text-white min-h-screen">
            <Navbar />
            <Routes>
                {/* --- Public & User Routes --- */}
                <Route path="/" element={<Home />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/view-book-details/:id" element={<ViewBookDetails />} />

                {/* --- Nested User Profile Route --- */}
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<Favourites />} />
                    <Route path="orderhistory" element={<UserOrderHistory />} />
                    <Route path="setting" element={<Settings />} /> {/* Make sure this matches your Sidebar link */}
                </Route>

                {/* --- Nested & Protected Admin Routes --- */}
                <Route element={<AdminRoute />}> {/* This protects all nested admin routes */}
                    <Route path="/admin" element={<AdminPanel />}>
                        <Route index element={<AllOrders />} />
                        <Route path="add-book" element={<AddBook />} />
                        <Route path="all-orders" element={<AllOrders />} />
                    </Route>
                </Route>
       <Route path="/update-book/:id" element={<UpdateBook />} />
                {/* --- FIX: Removed the old, redundant admin route --- */}
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
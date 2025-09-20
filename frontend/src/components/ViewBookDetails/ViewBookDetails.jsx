import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";

const ViewBookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axiosInstance.get(`/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (err) {
                console.error("Error fetching book details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleFavourite = async () => {
        try {
            const response = await axiosInstance.put("/add-book-to-favourite", {}, { headers: { bookid: id } });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
        }
    };

    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance.put("/add-to-cart", {}, { headers: { bookid: id } });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
            try {
                const response = await axiosInstance.delete("/delete-book", {
                    headers: { bookid: id },
                });
                alert(response.data.message);
                navigate("/all-books");
            } catch (error) {
                console.error("Failed to delete book:", error);
                alert(error.response?.data?.message || "An error occurred.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader />
            </div>
        );
    }

    if (!data) {
        return <div className="text-center text-red-500 py-8">Book not found.</div>;
    }

    const UserButtons = () => (
        <div className="absolute top-4 right-4 flex flex-col gap-4">
            <button onClick={handleFavourite} className="bg-white rounded-full text-2xl p-3 text-red-500 hover:bg-gray-200 transition-all shadow-lg"><FaHeart /></button>
            <button onClick={handleAddToCart} className="bg-white rounded-full text-2xl p-3 text-blue-500 hover:bg-gray-200 transition-all shadow-lg"><FaShoppingCart /></button>
        </div>
    );

    const AdminButtons = () => (
        <div className="absolute top-4 right-4 flex flex-col gap-4">
            <Link to={`/update-book/${id}`} className="bg-white rounded-full text-2xl p-3 text-green-500 hover:bg-gray-200 transition-all shadow-lg"><FaEdit /></Link>
            <button onClick={handleDelete} className="bg-white rounded-full text-2xl p-3 text-red-500 hover:bg-gray-200 transition-all shadow-lg"><FaTrash /></button>
        </div>
    );

    return (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row items-start gap-8 min-h-screen">
            <div className="relative w-full md:w-1/3 bg-zinc-800 rounded-lg overflow-hidden">
                <div className="aspect-[2/3] w-full">
                    <img
                        src={data.url}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {isLoggedIn && (
                    role === "admin" ? <AdminButtons /> : <UserButtons />
                )}
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h1 className="text-4xl text-zinc-100 font-semibold">{data.title}</h1>
                <p className="text-zinc-400 mt-1">by {data.author}</p>
                <p className="text-zinc-200 mt-4 text-lg leading-relaxed">{data.desc}</p>
                <p className="flex items-center gap-2 text-zinc-400 mt-4">
                    <b className="text-zinc-200">Language:</b> {data.language}
                </p>
                <p className="mt-4 text-3xl text-zinc-100 font-semibold">
                    Price: ₹ {data.price}
                </p>
            </div>
        </div>
    );
};

export default ViewBookDetails;
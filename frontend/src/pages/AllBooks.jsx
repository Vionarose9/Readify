import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import axiosInstance from "../api/axiosInstance"; // --- 1. USE THE INSTANCE ---

const AllBooks = () => {
    // --- 2. USE A PROPER LOADING STATE ---
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // --- 3. CALL THE CORRECT ENDPOINT ---
                const response = await axiosInstance.get("/get-all-books");
                setData(response.data.data);
            } catch (error) {
                console.error("Failed to fetch all books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="bg-zinc-900 px-4 md:px-12 py-8 min-h-screen">
            <h1 className="text-3xl font-semibold text-yellow-100">All Books</h1>
            
            {loading ? (
                <div className="flex items-center justify-center my-16">
                    <Loader />
                </div>
            ) : (
                <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.map((item) => (
                        <BookCard key={item._id} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBooks;
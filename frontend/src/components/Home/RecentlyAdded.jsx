import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import axiosInstance from "../../api/axiosInstance"; // --- 1. USE THE INSTANCE (path is different here) ---

const RecentlyAdded = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- 2. CALL THE CORRECT ENDPOINT ---
                const response = await axiosInstance.get("/get-recent-books");
                setData(response.data.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="flex items-center justify-center my-16">
                <Loader />
            </div>
        );
    }

    return (
        <div className="mt-8 px-4">
            <h1 className="text-3xl font-semibold text-yellow-100">Recently Added Books</h1>
            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {data.map((item) => (
                    <BookCard key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;
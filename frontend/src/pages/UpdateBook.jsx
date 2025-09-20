import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        url: '', title: '', author: '', language: '', price: '', desc: '',
    });

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosInstance.get(`/get-book-by-id/${id}`);
                // Pre-fill the form state with the existing book data
                setData(response.data.data);
            } catch (error) {
                console.error("Failed to fetch book data:", error);
            }
        };
        fetchBookData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put("/update-book", data, {
                headers: { bookid: id }
            });
            alert(response.data.message);
            navigate(`/view-book-details/${id}`); // Go back to the book's page
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="bg-zinc-900 p-8 min-h-screen text-white">
            <h1 className="text-3xl font-semibold">Update Book</h1>
            <div className="bg-zinc-800 p-8 rounded mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... Your form JSX here, same as in AddBook.jsx ... */}
                    {/* Example for one field: */}
                    <div>
                        <label htmlFor="url" className="text-zinc-400">Image URL</label>
                        <input type="text" id="url" name="url" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.url} onChange={handleChange} required />
                    </div>
                     <div>
                    <label htmlFor="title" className="text-zinc-400">Title of book</label>
                    <input type="text" id="title" name="title" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="author" className="text-zinc-400">Author of book</label>
                    <input type="text" id="author" name="author" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.author} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="language" className="text-zinc-400">Language</label>
                        <input type="text" id="language" name="language" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.language} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="price" className="text-zinc-400">Price</label>
                        <input type="number" id="price" name="price" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.price} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="desc" className="text-zinc-400">Description of book</label>
                    <textarea id="desc" name="desc" rows="5" className="w-full mt-2 p-2 bg-zinc-700 rounded" value={data.desc} onChange={handleChange} required />
                </div>
                    <button type="submit" className="w-full bg-green-600 font-semibold py-2 rounded hover:bg-green-700">
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

const Favourites = () => {
    const [favouriteBooks, setFavouriteBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the initial list of favourite books
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axiosInstance.get("/get-favourite-books");
                setFavouriteBooks(response.data.data);
            } catch (error) {
                console.error("Failed to fetch favourite books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavourites();
    }, []);

    // --- FUNCTION TO REMOVE A BOOK ---
    const handleRemoveBook = async (bookId) => {
        try {
            // Call the backend API to remove the book from the user's favourites
            await axiosInstance.put(
                "/remove-book-from-favourite",
                {}, // No body needed for this request
                { headers: { bookid: bookId } } // Pass bookid in the headers
            );

            // Update the state locally to instantly remove the book from the UI
            // This is more efficient than re-fetching the whole list from the server
            setFavouriteBooks(
                favouriteBooks.filter((book) => book._id !== bookId)
            );

            alert("Book removed from favourites.");

        } catch (error) {
            console.error("Failed to remove favourite book:", error);
            alert("An error occurred. Please try again.");
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
            <h1 className="text-3xl font-semibold">Your Favourite Books</h1>

            {favouriteBooks.length === 0 ? (
                <p className="mt-4 text-xl text-zinc-400">You have no favourite books yet.</p>
            ) : (
                // --- UI FROM THE SCREENSHOT ---
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favouriteBooks.map((book) => (
                        <div key={book._id} className="bg-zinc-800 p-4 rounded flex flex-col justify-between">
                            <div>
                                <img src={book.url} alt={book.title} className="h-64 w-full object-cover rounded" />
                                <h2 className="mt-4 text-xl font-semibold">{book.title}</h2>
                                <p className="mt-1 text-zinc-400">by {book.author}</p>
                                <p className="mt-2 text-2xl font-semibold">₹ {book.price}</p>
                            </div>
                            <button
                                className="mt-4 w-full bg-yellow-200 text-zinc-900 font-semibold py-2 rounded hover:bg-yellow-300 transition-all"
                                onClick={() => handleRemoveBook(book._id)}
                            >
                                Remove from favourite
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export  default Favourites;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Loader/Loader'; // Assuming you have a Loader component
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get('/get-user-cart');
                setCartItems(response.data.data);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    // Recalculate total price whenever cart items change
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [cartItems]);

    // Handler to remove an item from the cart
    const handleRemoveItem = async (bookId) => {
        try {
            await axiosInstance.put(`/remove-from-cart/${bookId}`);
            // Update UI instantly by filtering out the removed item
            setCartItems(cartItems.filter((item) => item._id !== bookId));
            alert("Book removed from cart.");
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Handler to place the order
    const handlePlaceOrder = async () => {
        try {
            // The backend expects an 'order' array in the body
            await axiosInstance.post('/place-order', { order: cartItems });
            alert("Order placed successfully!");
            setCartItems([]); // Clear the cart in the UI
            navigate('/profile/orderhistory'); // Redirect to order history
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 text-white min-h-screen px-4 md:px-12 py-8">
            <h1 className="text-4xl font-semibold mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-2xl text-zinc-400">Your cart is empty.</p>
                </div>
            ) : (
                <>
                    {/* Cart Items List */}
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="w-full bg-zinc-800 p-4 rounded flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={item.url} alt={item.title} className="h-20 w-16 object-cover rounded" />
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.title}</h2>
                                        <p className="text-zinc-400 text-sm truncate max-w-md">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <p className="text-2xl font-semibold">₹ {item.price}</p>
                                    <button
                                        className="text-red-500 text-2xl hover:text-red-600"
                                        onClick={() => handleRemoveItem(item._id)}
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-8 border-zinc-700" />

                    {/* Cart Summary and Place Order */}
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Total: <span className="text-yellow-400">₹ {totalPrice}</span>
                        </h2>
                        <button
                            className="mt-4 md:mt-0 bg-yellow-400 text-zinc-900 font-semibold py-3 px-8 rounded hover:bg-yellow-500 transition-all text-xl"
                            onClick={handlePlaceOrder}
                        >
                            Place your order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
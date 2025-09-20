import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

const UserOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axiosInstance.get('/get-order-history');
                // The API returns the orders in `response.data.data`
                setOrders(response.data.data);
            } catch (error) {
                console.error("Failed to fetch order history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader />
            </div>
        );
    }

    // Function to determine the color of the status text
    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'text-green-500';
            case 'Cancelled':
                return 'text-red-500';
            case 'Out for Delivery':
                return 'text-yellow-500';
            case 'Delivered':
                return 'text-blue-500';
            default:
                return 'text-zinc-400';
        }
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-semibold">Your Order History</h1>

            {orders.length === 0 ? (
                <div className="mt-8 text-center">
                    <p className="text-2xl text-zinc-400">You have no past orders.</p>
                </div>
            ) : (
                <div className="mt-8">
                    {/* Table Header */}
                    <div className="bg-zinc-800 p-4 rounded-t-lg flex font-semibold text-zinc-300">
                        <div className="w-[5%]">Sr.</div>
                        <div className="w-[25%]">Books</div>
                        <div className="w-[40%]">Description</div>
                        <div className="w-[10%] text-center">Price</div>
                        <div className="w-[15%] text-center">Status</div>
                        <div className="w-[5%] text-right">Mode</div>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-4 mt-4">
                        {orders.map((order, i) => (
                            <div key={order._id} className="bg-zinc-800 p-4 rounded-lg flex items-center">
                                <div className="w-[5%]">{i + 1}</div>
                                <div className="w-[25%] font-semibold">{order.book.title}</div>
                                <div className="w-[40%] text-zinc-400 truncate">{order.book.desc}</div>
                                <div className="w-[10%] text-center">₹ {order.book.price}</div>
                                <div className={`w-[15%] text-center font-semibold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </div>
                                <div className="w-[5%] text-right">COD</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserOrderHistory;
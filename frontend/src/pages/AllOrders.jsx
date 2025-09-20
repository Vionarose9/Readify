import React from 'react';

const AllOrders = () => {
    // In the future, you will fetch all orders from '/get-all-orders'
    // and display them here in a table.
    return (
        <div className="text-white bg-zinc-800 p-8 rounded">
            <h1 className="text-3xl font-semibold">All Orders</h1>
            <p className="mt-4 text-zinc-400">This page will display all user orders.</p>
        </div>
    );
};

export default AllOrders;
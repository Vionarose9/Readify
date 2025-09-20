import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    // 1. CORRECTED the URL to the one you want
    <Link to={`/view-book-details/${data._id}`}>
      <div className="bg-zinc-800 p-4 rounded-lg flex flex-col justify-between h-full shadow-md hover:shadow-xl transition-shadow duration-300">
        <div>
          {/* 2. REMOVED the extra, empty <Link> from here */}
          
          {/* Book Cover Image */}
          <div className="w-full h-64 bg-zinc-700 rounded-md mb-4">
            <img
              src={data.url}
              alt={data.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Book Title */}
          <h3
            className="text-xl font-semibold text-white h-14"
            title={data.title}
          >
            {data.title}
          </h3>
        </div>

        {/* Book Author and Price */}
        <div className="mt-2">
          <p className="text-zinc-400">by {data.author}</p>
          <p className="mt-2 text-xl font-bold text-white">₹ {data.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
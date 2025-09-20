import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <Link to={`/view-book-details/${data._id}`}>
      {/* Main card container with hover effects */}
      <div className="bg-zinc-800 p-4 rounded-lg flex flex-col h-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        {/* Fixed image container with proper aspect ratio */}
        <div className="aspect-[2/3] w-full mb-4 rounded-md overflow-hidden">
          <img
            src={data.url}
            alt={data.title}
            // 'object-cover' ensures the image fills the space without stretching or squashing.
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow">
          {/* Title with truncation to prevent breaking the layout */}
          <h3
            className="text-xl font-semibold text-white truncate"
            title={data.title}
          >
            {data.title}
          </h3>
          <p className="text-zinc-400 mt-1">by {data.author}</p>
          <p className="mt-auto text-xl font-bold text-white">₹ {data.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
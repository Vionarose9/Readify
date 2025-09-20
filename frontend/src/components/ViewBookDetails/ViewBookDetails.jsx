import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader"; // Make sure this path is correct
import { useParams } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  
  // Initialize with null to properly handle the loading state
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          // Using port 1000 as it seems to be your standard from other components
          `http://localhost:5000/api/v1/get-book-by-id/${id}` 
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      }
    };
    fetch();
  }, [id]); // FIX 1: Added [id] dependency to refetch if the user navigates between detail pages

  // FIX 2: Added loading and error handling for better UX
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center my-16">
        <Loader />
      </div>
    );
  }

  // FIX 3: Replaced the empty divs with JSX that displays the book data
  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
      {/* Left side - Image and Price */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-zinc-800 rounded p-4 h-full flex flex-col items-center justify-center">
          <img src={data.url} alt={data.title} className="h-[50vh] md:h-[60vh] rounded" />
          <p className="mt-4 text-3xl font-bold text-white">₹ {data.price}</p>
        </div>
      </div>
      
      {/* Right side - Details */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        <h1 className="text-4xl text-yellow-100 font-semibold">{data.title}</h1>
        <p className="text-zinc-400 mt-1">by {data.author}</p>
        <p className="text-zinc-300 mt-4 text-lg leading-relaxed">{data.desc}</p>
        <div className="flex mt-4 gap-4 items-center">
          <button className="bg-white text-zinc-900 font-semibold px-5 py-2 rounded hover:bg-zinc-200">
            Add to Cart
          </button>
          <button className="bg-yellow-100 text-zinc-900 font-semibold px-5 py-2 rounded hover:bg-yellow-200">
            Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // It's good practice to reset the state in case of a re-fetch
      setError(null); 
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/get-recent-books" // Adjusted port to 1000 from your previous code
        );
        
        // Make sure to set the state with the actual array of books
        setData(response.data.data); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load recent books. Please try again later.");
      }
    };
    fetchData();
  }, []); // The empty array ensures this effect runs only once

  // --- State Handling ---

  // 1. If there's an error, show the error message and stop.
  if (error) {
    return <div className="mt-8 px-4 text-center text-red-500">{error}</div>;
  }
  
  // 2. If data is still null (i.e., loading), show the loader and stop.
  // This is the key fix for the "Cannot read properties of null" error.
  if (!data) {
    return (
      <div className="flex items-center justify-center my-16">
        <Loader />
      </div>
    );
  }

  // 3. If the code reaches this point, it's safe to assume 'data' is an array.
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((item) => (
          <div key={item._id}>
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
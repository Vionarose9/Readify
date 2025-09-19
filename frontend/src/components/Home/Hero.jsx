import React from "react";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col lg:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>

        {/* Button */}
        <div className="mt-8">
          <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 rounded-full hover:bg-zinc-800 transition duration-300">
            Discover Books
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-3/6 flex items-center justify-center mt-8 lg:mt-0">
        <img
          src="/clay-banks-w_qTfiPbjbg-unsplash.jpg"
          alt="hero"
          className="max-h-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;

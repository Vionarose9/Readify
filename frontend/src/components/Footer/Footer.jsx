import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-800 text-white py-5 px-8 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm">
            &copy; {currentYear} Readify. All Rights Reserved.
          </p>
          <ul className="flex space-x-6">
            <li>
              <a href="/about" className="text-sm hover:underline">About</a>
            </li>
            <li>
              <a href="/contact" className="text-sm hover:underline">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
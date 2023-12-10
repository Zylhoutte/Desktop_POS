import React from 'react';
import { Link } from 'react-router-dom';

const YourComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        <Link to="/overview">
          <div className="bg-red-300 p-20 text-white text-xl">Overview</div>
        </Link>
        <Link to="/storage">
          <div className="bg-blue-300 p-20 text-white text-xl">Storage</div>
        </Link>
        <Link to="/cashiers">
          <div className="bg-green-300 p-20 text-white text-xl">Cashiers</div>
        </Link>
        <Link to="/invoice">
          <div className="bg-yellow-300 p-20 text-gray-800 text-xl">Invoice</div>
        </Link>
        <Link to="/service">
          <div className="bg-purple-300 p-20 text-white text-xl">Service</div>
        </Link>
        <Link to="/clock">
          <div className="bg-pink-300 p-20 text-white text-xl">Clock</div>
        </Link>
        {/* Add more cells as needed */}
      </div>
    </div>
  );
};

export default YourComponent;

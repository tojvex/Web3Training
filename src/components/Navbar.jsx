import React from 'react';
import { FaBitcoin } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FaBitcoin className="text-yellow-500 text-3xl mr-2" />
            <span className="font-bold text-xl">CryptoDash</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src={process.env.PUBLIC_URL + "/images/logo.png"} 
                alt="Teras Omah Logo" 
                className="h-16 md:h-20" // Meningkatkan ukuran logo, sesuaikan angka sesuai keinginan
              />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 text-2xl"
            >
              ☰
            </button>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/menu" className="text-gray-600 hover:text-gray-800">Menu</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">Kritik dan Saran</Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/menu" className="block px-3 py-2 text-gray-600 hover:text-gray-800">Menu</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-800">Kritik dan Saran</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

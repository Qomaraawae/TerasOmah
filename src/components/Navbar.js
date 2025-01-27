import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg z-50">
      {" "}
      {/* Menambahkan z-index */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                alt="Teras Omah Logo"
                className="h-16 md:h-20"
              />
            </Link>
          </div>

          {/* Tombol Hamburger */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 text-2xl"
            >
              <div
                className={`w-6 h-0.5 bg-gray-500 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 absolute" : ""
                } ${isMenuOpen ? "top-2" : ""}`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-gray-500 my-1 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-gray-500 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 absolute" : ""
                } ${isMenuOpen ? "top-2" : ""}`}
              ></div>
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to="/menu" className="text-gray-600 hover:text-gray-800">
              Menu
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">
              Kritik dan Saran
            </Link>
          </div>
        </div>
      </div>
      {/* Menu Mobile dengan transisi turun ke bawah */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-white text-gray-800 h-full transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } z-50`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/menu"
            className="text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className="text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Kritik dan Saran
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

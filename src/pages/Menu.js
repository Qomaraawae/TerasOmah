import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import menuData from "../database.json"; // Impor data JSON
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
const secretKey = process.env.REACT_APP_SECRET_KEY;

console.log(apiUrl); // Akan mencetak https://api.example.com
console.log(secretKey); // Akan mencetak your_secret_key


const Menu = () => {
  const { addToCart } = useCart();
  const { category } = useParams(); // Ambil kategori dari URL params
  const [selectedCategory, setSelectedCategory] = useState(category || "makanan");

  // Update selectedCategory berdasarkan URL
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const renderMenu = (category) => {
    return menuData[category]?.map((item) => (
      <div
        key={item.id}
        className="menu-item bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative group"
      >
        {/* Gambar Menu */}
        <img
          src={item.image ? `/images/${item.image}` : "/images/default-image.jpg"}
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Info (harga dan tombol) yang hanya muncul saat hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-lg font-semibold mb-4">
            Rp {item.price.toLocaleString()}
          </p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none transition"
          >
            Tambahkan ke Keranjang
          </button>
        </div>

        {/* Nama Menu */}
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-800 my-2">{item.name}</h2>
        </div>
      </div>
    ));
  };

  return (
    <div className="menu container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">Menu Teras Omah</h1>

      {/* Tombol kategori */}
      <div className="flex justify-center space-x-8 mb-6">
        <button
          onClick={() => setSelectedCategory("makanan")}
          className={`${
            selectedCategory === "makanan" ? "bg-green-700" : "bg-green-500"
          } text-white px-6 py-2 rounded-full hover:bg-green-700 transition`}
        >
          Makanan
        </button>
        <button
          onClick={() => setSelectedCategory("camilan")}
          className={`${
            selectedCategory === "camilan" ? "bg-yellow-700" : "bg-yellow-500"
          } text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition`}
        >
          Camilan
        </button>
        <button
          onClick={() => setSelectedCategory("minuman")}
          className={`${
            selectedCategory === "minuman" ? "bg-blue-700" : "bg-blue-500"
          } text-white px-6 py-2 rounded-full hover:bg-blue-700 transition`}
        >
          Minuman
        </button>
      </div>

      {/* Menampilkan menu berdasarkan kategori yang dipilih */}
      <div className="category">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
          {selectedCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {renderMenu(selectedCategory)}
        </div>
      </div>
    </div>
  );
};

export default Menu;

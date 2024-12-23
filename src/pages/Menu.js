import React from "react";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const { addToCart } = useCart();

  const menuItems = [
    { id: 1, name: "Nasi Goreng", price: 20000, image: "nasi-goreng.jpg" },
    { id: 2, name: "Es Teh", price: 5000, image: "es-teh.jpg" },
    { id: 3, name: "Ayam Bakar", price: 25000, image: "ayam-bakar.jpg" },
  ];

  return (
    <div className="menu">
      <h1 className="text-center text-2xl font-bold my-4">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item text-center border p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold my-2">{item.name}</h2>
            <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
            <button
              onClick={() => {
                console.log(`Menambahkan ${item.name} ke keranjang`);
                addToCart(item);
              }}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tambahkan ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

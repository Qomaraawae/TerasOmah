import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:3001/menu');
        const data = await response.json();
        setMenuItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Menu Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-lg mb-4">Rp {item.price.toLocaleString('id-ID')}</p>
              <button
                onClick={() => addToCart(item)}
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

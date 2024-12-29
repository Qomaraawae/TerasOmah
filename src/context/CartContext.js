import React, { createContext, useContext, useState } from "react";

// Membuat context keranjang
const CartContext = createContext();

// Membuat provider untuk CartContext
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Menambah item ke keranjang
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Cari item yang sudah ada di keranjang
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Jika item sudah ada, perbarui quantity-nya
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tambah 1 untuk item yang ada
            : cartItem
        );
      } else {
        // Jika item belum ada, tambahkan ke keranjang dengan quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Menghapus item dari keranjang atau mengurangi jumlah item
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 } // Kurangi quantity
            : item
        )
        .filter((item) => item.quantity > 0) // Hapus item yang quantity-nya 0
    );
  };

  // Membersihkan semua item di keranjang
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan context Cart
export const useCart = () => useContext(CartContext);

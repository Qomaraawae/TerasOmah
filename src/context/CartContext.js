import React, { createContext, useContext, useState } from "react";

// Membuat context keranjang
const CartContext = createContext();

// Membuat provider untuk CartContext
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Menambah item ke keranjang
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Gunakan spread operator untuk membuat salinan array
        const updatedCart = [...prevCart];
        // Pastikan increment hanya 1
        const currentQuantity = updatedCart[existingItemIndex].quantity;
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: currentQuantity + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Menghapus item dari keranjang atau mengurangi jumlah item
  const removeFromCart = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 } // Kurangi quantity
              : item
          )
          .filter((item) => item.quantity > 0) // Hapus item dengan quantity 0
    );
  };

  // Membersihkan semua item di keranjang
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan context Cart
export const useCart = () => useContext(CartContext);

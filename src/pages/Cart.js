import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart(); // Ambil data keranjang dan fungsi dari context
  const navigate = useNavigate();

  // Fungsi untuk menghitung subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang belanja kosong</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        removeFromCart(item.id); // Kurangi jumlah item jika lebih dari 1
                      } else {
                        removeFromCart(item.id); // Hapus item jika quantity = 1
                      }
                    }}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span> {/* Menampilkan jumlah item */}
                  <button
                    onClick={() => addToCart(item)} // Menambah jumlah item
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="text-xl font-semibold">
              Subtotal: Rp {calculateSubtotal().toLocaleString("id-ID")}
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Lanjut ke Pembayaran
            </button>
            <button
              onClick={clearCart}
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-700"
            >
              Hapus Semua
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'error'

  const calculateTotals = (cart) => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const handlingFee = 2000;
    const tax = subtotal * 0.11;
    const total = subtotal + handlingFee + tax;
    return { subtotal, handlingFee, tax, total };
  };

  const { subtotal, handlingFee, tax, total } = calculateTotals(cart);

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Keranjang belanja kosong!");
      navigate("/cart");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulasi proses pembayaran
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();
      setPaymentStatus("success");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setPaymentStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Penanganan</span>
            <span>Rp {handlingFee.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>PPN (11%)</span>
            <span>Rp {tax.toLocaleString("id-ID")}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {paymentStatus === "success" && (
          <div className="text-green-600 font-semibold mt-4">
            Pembayaran berhasil! Mengalihkan ke halaman utama...
          </div>
        )}
        {paymentStatus === "error" && (
          <div className="text-red-600 font-semibold mt-4">
            Terjadi kesalahan saat memproses pembayaran.
          </div>
        )}

        <button
          onClick={handlePayment}
          className={`mt-8 w-full py-3 rounded-lg text-white ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
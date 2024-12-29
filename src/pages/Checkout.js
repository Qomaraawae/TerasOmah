import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf"; // Import jsPDF

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fungsi untuk menghitung subtotal, pajak, biaya penanganan, dan total
  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const handlingFee = 2000;
    const tax = subtotal * 0.11;
    const total = subtotal + handlingFee + tax;
    return { subtotal, handlingFee, tax, total };
  };

  const { subtotal, handlingFee, tax, total } = calculateTotals();

  // Fungsi untuk menghasilkan file PDF struk pesanan
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Struk Pesanan", 20, 20);
    let yPosition = 30;

    // Menambahkan item ke dalam PDF
    cart.forEach((item) => {
      doc.text(
        `${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
        20,
        yPosition
      );
      yPosition += 10;
    });

    // Menambahkan subtotal, pajak, biaya penanganan, dan total ke dalam PDF
    doc.text(`Subtotal: Rp ${subtotal.toLocaleString("id-ID")}`, 20, yPosition);
    doc.text(`Tax (11%): Rp ${tax.toLocaleString("id-ID")}`, 20, yPosition + 10);
    doc.text(`Handling Fee: Rp ${handlingFee.toLocaleString("id-ID")}`, 20, yPosition + 20);
    doc.text(`Total: Rp ${total.toLocaleString("id-ID")}`, 20, yPosition + 30);

    // Mengunduh PDF secara otomatis
    doc.save("struk_pesanan.pdf");
  };

  // Fungsi untuk menangani pembayaran
  const handlePayment = () => {
    setIsPopupOpen(true);
  };

  const confirmPayment = () => {
    generatePDF(); // Memanggil fungsi untuk mengunduh PDF
    clearCart(); // Menghapus semua item dari keranjang
    alert("Pembayaran berhasil! File PDF telah diunduh.");
    setIsPopupOpen(false);
    navigate("/"); // Kembali ke halaman utama
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
          </div>
        ))}
        {/* Menampilkan subtotal, handling fee, dan pajak */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (11%)</span>
          <span>Rp {tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between">
          <span>Handling Fee</span>
          <span>Rp {handlingFee.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-2 bg-green-500 text-white rounded-lg mt-4 hover:bg-green-700 transition"
        >
          Konfirmasi Pembayaran
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Pembayaran</h3>
            <p>Apakah Anda yakin ingin melanjutkan pembayaran?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
              >
                Edit
              </button>
              <button
                onClick={confirmPayment}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-700"
              >
                Konfirmasi Pemesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

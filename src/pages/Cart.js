import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf"; // Mengimpor jsPDF untuk membuat file PDF
import "jspdf-autotable"; // Mengimpor autoTable plugin

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State untuk menampilkan pop-up konfirmasi

  // Fungsi untuk menghitung subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Fungsi untuk mengunduh PDF struk pesanan
  const generatePDF = () => {
    const doc = new jsPDF();

    // Judul
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Struk Pesanan", 14, 22);

    // Garis pemisah
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);

    // Tabel
    doc.autoTable({
      startY: 30,
      head: [['Item', 'Quantity', 'Price']],
      body: cart.map(item => [
        item.name, 
        item.quantity, 
        `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`
      ]),
      theme: 'grid',
      styles: { 
        fontSize: 12, 
        cellPadding: 4 
      },
      headStyles: { 
        fillColor: [40, 60, 100], 
        textColor: [255, 255, 255] 
      },
      bodyStyles: { 
        fillColor: [240, 240, 240], 
        textColor: [0, 0, 0] 
      },
    });

    // Subtotal, Pajak, Biaya Penanganan, dan Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Subtotal: Rp ${calculateSubtotal().toLocaleString("id-ID")}`, 14, finalY);
    const tax = calculateSubtotal() * 0.11;
    doc.text(`Tax (11%): Rp ${tax.toLocaleString("id-ID")}`, 14, finalY + 10);
    const handlingFee = 2000;
    doc.text(`Handling Fee: Rp ${handlingFee.toLocaleString("id-ID")}`, 14, finalY + 20);
    const total = calculateSubtotal() + tax + handlingFee;
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`Total: Rp ${total.toLocaleString("id-ID")}`, 14, finalY + 30);

    // Mengunduh PDF secara otomatis
    doc.save("struk_pesanan.pdf");
  };

  // Fungsi untuk menangani konfirmasi pembayaran
  const handleConfirmPayment = () => {
    setIsPopupOpen(true); // Menampilkan pop-up konfirmasi
  };

  // Fungsi untuk konfirmasi pembayaran setelah pop-up
  const confirmPayment = () => {
    generatePDF(); // Menghasilkan file PDF
    clearCart(); // Menghapus semua item dari keranjang
    alert("Pembayaran berhasil! File PDF telah diunduh.");
    setIsPopupOpen(false); // Menutup pop-up
    navigate("/"); // Kembali ke halaman utama
  };

  // Fungsi untuk menutup pop-up tanpa melakukan pembayaran
  const closePopup = () => {
    setIsPopupOpen(false);
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
                    src={process.env.PUBLIC_URL + "/images/" + item.image}
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
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
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
              onClick={handleConfirmPayment}
              className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Konfirmasi Pemesanan
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

      {/* Pop-up Konfirmasi Pesanan */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 space-y-4 shadow-lg">
            <h3 className="text-xl font-bold">Konfirmasi Pesanan</h3>
            <p>Apakah pesanan Anda sudah sesuai?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Edit
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

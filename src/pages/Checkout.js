import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const handlingFee = 2000;
  const tax = subtotal * 0.11; // PPN 11%
  const total = subtotal + handlingFee + tax;

  const handlePayment = async () => {
    try {
      // Simulasi proses pembayaran
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Show success notification and redirect
      alert('Pembayaran berhasil!');
      navigate('/');
    } catch (error) {
      alert('Terjadi kesalahan saat memproses pembayaran');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Penanganan</span>
            <span>Rp {handlingFee.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>PPN (11%)</span>
            <span>Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

export default Checkout;
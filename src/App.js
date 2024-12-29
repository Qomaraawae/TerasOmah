import React from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useCart(); // Ambil data cart dari context
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-4 flex items-center space-x-2 bg-white shadow-lg p-2 rounded-full">
      <button
        onClick={() => navigate("/cart")} // Menggunakan navigate untuk routing
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-700"
      >
        🛒
      </button>
      <span className="text-sm font-semibold">{cart.length} item</span>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Rute kategori (makanan, minuman, camilan) */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Menu />} /> {/* Kategori dinamis */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <CartIcon />
      </Router>
    </CartProvider>
  );
}

export default App;

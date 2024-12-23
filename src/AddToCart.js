// src/AddToCart.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase'; // Mengimpor Firebase config

const AddToCart = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddToCart = async () => {
    if (!itemName || !itemPrice) {
      alert("Please enter both item name and price!");
      return;
    }

    const newItem = { name: itemName, price: itemPrice };
    try {
      await addDoc(collection(db, "cartItems"), newItem);
      console.log("Item added to cart");
      setItemName('');
      setItemPrice('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Add Item to Cart</h2>
      <input 
        type="text" 
        placeholder="Item Name" 
        value={itemName} 
        onChange={(e) => setItemName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Item Price" 
        value={itemPrice} 
        onChange={(e) => setItemPrice(e.target.value)} 
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;

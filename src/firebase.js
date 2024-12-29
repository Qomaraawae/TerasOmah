// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6pJVYa1_A-xz9l3xLNuBrRNDAoXBHXiY",
  authDomain: "terasomah-7cb93.firebaseapp.com",
  projectId: "terasomah-7cb93",
  storageBucket: "terasomah-7cb93.firebasestorage.app",
  messagingSenderId: "753148164087",
  appId: "1:753148164087:web:8fb26330e3815b95a3a0f2",
  measurementId: "G-LT05E97T1Q"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
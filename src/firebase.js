// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Mengimpor getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6pJVYa1_A-xz9l3xLNuBrRNDAoXBHXiY",
  authDomain: "terasomah-7cb93.firebaseapp.com",
  projectId: "terasomah-7cb93",
  storageBucket: "terasomah-7cb93.firebasestorage.app",
  messagingSenderId: "753148164087",
  appId: "1:753148164087:web:8fb26330e3815b95a3a0f2",
  measurementId: "G-LT05E97T1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Menginisialisasi Firestore
const db = getFirestore(app); // Mendapatkan instance Firestore

// Inisialisasi Analytics (opsional)
const analytics = getAnalytics(app);

// Ekspor db untuk digunakan di file lain
export { db, analytics };

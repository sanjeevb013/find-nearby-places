// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlC-6VdvGtE5EB3OSKf9bLtNIkYFt359A",
  authDomain: "nearby-places-finder-46f00.firebaseapp.com",
  projectId: "nearby-places-finder-46f00",
  storageBucket: "nearby-places-finder-46f00.firebasestorage.app",
  messagingSenderId: "373895626201",
  appId: "1:373895626201:web:f49d75ede7c2e1dbf32dc8",
  measurementId: "G-8EX7JXCN9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

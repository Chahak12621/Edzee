// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv1J7tUy0a8ok3mtdn2TmYFf7Utv9qJyI",
  authDomain: "studio-3197652952-f5a2a.firebaseapp.com",
  projectId: "studio-3197652952-f5a2a",
  storageBucket: "studio-3197652952-f5a2a.firebasestorage.app",
  messagingSenderId: "216693249748",
  appId: "1:216693249748:web:f422112b86c31e13ab8d41"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔥 Auth
export const auth = getAuth(app);

// 🔵 Google Provider
export const googleProvider = new GoogleAuthProvider();
// 🔥 Firestore
export const db = getFirestore(app);
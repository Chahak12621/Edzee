// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// TODO(developer) Replace the following with your app's Firebase configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize the Gemini Developer API backend service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

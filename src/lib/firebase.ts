import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBG2zB42UJ1b8WAxLV3CLkdBaGAP-jCqM4",
  authDomain: "perfectfit-b5581.firebaseapp.com",
  projectId: "perfectfit-b5581",
  storageBucket: "perfectfit-b5581.firebasestorage.app",
  messagingSenderId: "459674943880",
  appId: "1:459674943880:web:387c759500868d02943a3d",
  measurementId: "G-8N9TX7MB19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

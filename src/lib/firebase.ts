import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG2zB42UJ1b8WAxLV3CLkdBaGAP-jCqM4",
  authDomain: "perfectfit-b5581.firebaseapp.com",
  projectId: "perfectfit-b5581",
  storageBucket: "perfectfit-b5581.appspot.com",
  messagingSenderId: "459674943880",
  appId: "1:459674943880:web:387c759500868d02943a3d",
  measurementId: "G-8N9TX7MB19",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber, signOut };
export default app;

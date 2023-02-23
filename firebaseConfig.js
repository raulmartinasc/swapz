// Import the functions you need from the SDKs you need
// import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB7MLSPg_8ERZO5yNbw8fnE42rxcJaWD8",
  authDomain: "swapz-f37c8.firebaseapp.com",
  projectId: "swapz-f37c8",
  storageBucket: "swapz-f37c8.appspot.com",
  messagingSenderId: "312862480096",
  appId: "1:312862480096:web:70f8eeb0f4154eda196285",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

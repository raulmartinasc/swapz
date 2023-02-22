// Import the functions you need from the SDKs you need
// import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmk3z2YCy3aQ3dLOMhOns42ZY5EdE0Y8A",
    authDomain: "swapz-app.firebaseapp.com",
    projectId: "swapz-app",
    storageBucket: "swapz-app.appspot.com",
    messagingSenderId: "19710547302",
    appId: "1:19710547302:web:29dc90fb691d09e77024a7"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
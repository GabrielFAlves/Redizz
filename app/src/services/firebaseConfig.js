// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAG_gB_RX4pvkvpFeVNCnz7x3vDu9PMV0",
  authDomain: "redizz-19a0d.firebaseapp.com",
  projectId: "redizz-19a0d",
  storageBucket: "redizz-19a0d.appspot.com",
  messagingSenderId: "1008208062532",
  appId: "1:1008208062532:web:1bfeda0df47bdb38b1f411",
  measurementId: "G-YPW749950P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
export const db = getFirestore(app); // Use 'app' instead of 'firebaseApp'

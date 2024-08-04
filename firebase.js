// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxcu7APPT8Tp61BBCTDSwY4UqJHtz5izI",
  authDomain: "inventory-management-1dbc6.firebaseapp.com",
  projectId: "inventory-management-1dbc6",
  storageBucket: "inventory-management-1dbc6.appspot.com",
  messagingSenderId: "192935022335",
  appId: "1:192935022335:web:bf563712eb019ff30b86ca",
  measurementId: "G-EG95W0D298"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Use the configuration for the Realtime Database
const firebaseSalesConfig = {
  apiKey: "AIzaSyBXeSuyAknp2ose0kxu8CwCbfKL8mQcj0w",
  authDomain: "bt3103-login-6c741.firebaseapp.com",
  databaseURL: "https://bt3103-login-6c741-default-rtdb.asia-southeast1.firebasedatabase.app", // Correct database URL
  projectId: "bt3103-login-6c741",
  storageBucket: "bt3103-login-6c741.appspot.com",
  messagingSenderId: "988255917610",
  appId: "1:988255917610:web:bffbb19f5ce8468e8c9553",
  measurementId: "G-GYYZ1MBSBV"
}; 

// Initialize a separate Firebase instance for sales data
const salesApp = initializeApp(firebaseSalesConfig, "salesApp");
export const salesDatabase = getDatabase(salesApp);

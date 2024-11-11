import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// Firebase configuration for Realtime Database
const firebaseSuppliersConfig = {
  apiKey: "AIzaSyBXeSuyAknp2ose0kxu8CwCbfKL8mQcj0w",
  authDomain: "bt3103-login-6c741.firebaseapp.com",
  databaseURL: "https://bt3103-login-6c741-default-rtdb.asia-southeast1.firebasedatabase.app", // Your database URL
  projectId: "bt3103-login-6c741",
  storageBucket: "bt3103-login-6c741.appspot.com",
  messagingSenderId: "988255917610",
  appId: "1:988255917610:web:bffbb19f5ce8468e8c9553",
  measurementId: "G-GYYZ1MBSBV"
};

// Initialize Firebase
const suppliersApp = initializeApp(firebaseSuppliersConfig, "suppliersApp");
export const db = getDatabase(suppliersApp);

// Fetch suppliers from Firebase Realtime Database
export const loadSuppliers = async () => {
  const suppliersRef = ref(db, 'suppliers');  // Reference to the 'suppliers' node
  try {
    const snapshot = await get(suppliersRef);  // Get the data from the database
    if (snapshot.exists()) {
      const suppliers = snapshot.val();
      // Convert the object into an array of suppliers
      return Object.keys(suppliers).map(key => ({
        id: key,
        ...suppliers[key]
      }));
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};

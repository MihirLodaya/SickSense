import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "*******************",
  authDomain: "sicksense-parul.firebaseapp.com",
  projectId: "sicksense-parul",
  storageBucket: "sicksense-parul.firebasestorage.app",
  messagingSenderId: "987550835323",
  appId: "1:987550835323:web:fdea1374622df6c4bc78de",
  measurementId: "G-1SYJNY0R87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Export Firebase modules
export { app, auth, firestore };

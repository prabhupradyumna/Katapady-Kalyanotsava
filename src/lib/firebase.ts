import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGwEOffaSgGjfxY4F68rrD4osO4wk8OEc",
  authDomain: "katapady-kalyanotsava.firebaseapp.com",
  projectId: "katapady-kalyanotsava",
  storageBucket: "katapady-kalyanotsava.firebasestorage.app",
  messagingSenderId: "103120674538",
  appId: "1:103120674538:web:08d317069ec2de3f1ec193",
  measurementId: "G-6VYQSLCFSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

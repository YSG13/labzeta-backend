import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmZW3gxcDAe8c6G-yD-jvCGKSRSk3jEAA",
  authDomain: "labzeta-2d5c8.firebaseapp.com",
  projectId: "labzeta-2d5c8",
  storageBucket: "labzeta-2d5c8.appspot.com",
  messagingSenderId: "152092140492",
  appId: "1:152092140492:web:9b58a71e8a205a014c7369"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
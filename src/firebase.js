// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrFddVdE8_rRRrIoy_KnQmfYNXp1yyz-0",
  authDomain: "labzeta2-25893.firebaseapp.com",
  projectId: "labzeta2-25893",
  storageBucket: "labzeta2-25893.firebasestorage.app",
  messagingSenderId: "118227560411",
  appId: "1:118227560411:web:622663d9be3b7e613529fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

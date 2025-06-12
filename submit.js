// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmZW3gxcDAe8c6G-yD-jvCGKSRSk3jEAA",
  authDomain: "labzeta-2d5c8.firebaseapp.com",
  projectId: "labzeta-2d5c8",
  storageBucket: "labzeta-2d5c8.appspot.com",
  messagingSenderId: "152092140492",
  appId: "1:152092140492:web:9b58a71e8a205a014c7369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit handler
document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const description = document.getElementById("description").value.trim();
  const resultEl = document.getElementById("resultMessage");

  try {
    const docRef = await addDoc(collection(db, "projects"), {
      name,
      email,
      description,
      timestamp: new Date().toISOString()
    });

    resultEl.innerText = `✅ Request submitted! Your ID is: ${docRef.id}`;
    
    // Optional: Send email via external service (like EmailJS or backend)
    // You'd add that here.

    document.getElementById("projectForm").reset();
  } catch (error) {
    resultEl.innerText = `❌ Error: ${error.message}`;
  }
});

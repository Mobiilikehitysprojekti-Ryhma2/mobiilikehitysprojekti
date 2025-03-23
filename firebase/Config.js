import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: "AIzaSyAMGUiSEtoOoPYP1r3DBH7bsUt44t4GOpI",
  authDomain: "chat-2025-40090.firebaseapp.com",
  projectId: "chat-2025-40090",
  storageBucket: "chat-2025-40090.firebasestorage.app",
  messagingSenderId: "257504185900",
  appId: "1:257504185900:web:ddc33c69ecd228dfb98b89"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

export {
  firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signOut
};

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  initializeAuth, 
  getReactNativePersistence
} from "firebase/auth";
import Constants from "expo-constants";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.firebaseApiKey,
  authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
  projectId: Constants.expoConfig.extra.firebaseProjectId,
  storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
  appId: Constants.expoConfig.extra.firebaseAppId,
};

// Initialize Firebase
app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore = getFirestore();


export {
  auth,
  firestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
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
  signOut,
  deleteUser,
};
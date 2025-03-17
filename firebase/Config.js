import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkj_pyHuitePYcNZEI5mfLmi4awY8bhFM",
  authDomain: "mobileapp-9df6f.firebaseapp.com",
  projectId: "mobileapp-9df6f",
  storageBucket: "mobileapp-9df6f.firebasestorage.app",
  messagingSenderId: "605000657990",
  appId: "1:605000657990:web:31f8233ce7cc7b20db6e47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const firestore = getFirestore()

const MESSAGES = "messages"

export {
    firestore,
    addDoc,
    collection,
    MESSAGES,
}


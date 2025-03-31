import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
} from "../firebase/Config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Current user: ", currentUser);
    });
    return unsubscribe;
  }, []);

  // Register function
  const register = async (email, password, username) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      // Save user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });

      setUser({ uid: user.uid, username, email });
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      // Update user state after login
      setUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // Account delete function
  const deleteAccount = async () => {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }
    } catch (error) {
      console.error("Account deletion failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, deleteAccount }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

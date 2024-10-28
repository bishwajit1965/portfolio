import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Newly modified for JWT on 29.09.2024
  const API_URL = "http://localhost:5000/api/auth"; //Adjust based on backend URI

  // Create user
  const createUser = async (email, password, name, photoUrl) => {
    setLoading(true);
    try {
      // create user in Firebase
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await response.user.getIdToken(); // Firebase token

      // Send firebase token to backend (if you want to store it in local storage)
      const { data } = await axios.post(`${API_URL}/register`, {
        email,
        password,
        uid: response.user.uid, // Fetch UID from Firebase response
        name,
        photoUrl,
        token,
      });

      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      setUser({ ...response.user, role: data.user.role });
    } catch (error) {
      console.error("Error during user creation:", error);
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = response.user; //Firebase returns the user object here
      const firebaseToken = await response.user.getIdToken();
      // Send firebase token to backend (if you want to store it in local storage)

      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
        token: firebaseToken,
      });

      console.log("Response from backend:", data); // Check if the token is returned

      // Store JWT from backend
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      } else {
        console.log("No token received from backend");
      }
      // Set the user object with the role retrieved from MongoDB

      const userWithRole = { ...firebaseUser, role: data.user.role };
      setUser(userWithRole); // Update the user in AuthContext

      // Return the user with the role to handle redirection
      return userWithRole;
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in using google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseToken = await user.getIdToken(); //Get the firebase token
      // Send token to your server for further processing if needed
      const { data } = await axios.post(`${API_URL}/google-login`, {
        token: firebaseToken,
      });

      if (data.token) {
        // Store JWT from backend
        localStorage.setItem("jwt", data.token);
      }
      setUser({ ...result.user, role: data.user.role }); // Set user from Firebase
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Logout
  const handleSignOut = async (onSuccess) => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("jwt");
      setUser(null);
      if (onSuccess) onSuccess(); // Call onSuccess to navigate after sign out
    } finally {
      setLoading(false);
    }
  };

  const setFirebasePersistence = async () => {
    await setPersistence(auth, browserLocalPersistence);
  };
  useEffect(() => {
    setFirebasePersistence();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        const token = await currentUser.getIdToken(); // Get Firebase ID token

        // Store the token in localStorage if it's not there (on page reload)
        if (!localStorage.getItem("jwt")) {
          localStorage.setItem("jwt", token);
        }

        try {
          // Fetch user role and other data from the backend using the JWT in localStorage
          const response = await axios.get(`${API_URL}/currentUser`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          });

          // Set user in state with role fetched from backend
          setUser({ ...currentUser, role: response.data.role });
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null); // Clear user if not logged in
        localStorage.removeItem("jwt"); // Remove JWT from localStorage
      }
      setLoading(false); // Stop the loading indicator
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    handleSignOut,
    updateUserProfile,
    isLoggedIn: !!user, // Adds a boolean indicating login status true by (!!) sign
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

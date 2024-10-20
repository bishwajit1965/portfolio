import { createContext, useEffect, useState } from "react";

import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

export const SuperAdminAuthContext = createContext();

export const SuperAdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);

  const loginSuperAdmin = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/super-admin/auth/login", {
        email,
        password,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token); // Store JWT in context state
        console.log("Token saved:", token);
        return token;
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutSuperAdmin = () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } catch (error) {
      setError("Logout error", error);
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    loading,
    token,
    user,
    loginSuperAdmin,
    logoutSuperAdmin,
    error,
  };

  return (
    <SuperAdminAuthContext.Provider value={authInfo}>
      {children}
    </SuperAdminAuthContext.Provider>
  );
};
export default SuperAdminAuthProvider;

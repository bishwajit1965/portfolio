//import * as jwt from "jwt-decode"; // Fix import to use named import

import { useContext, useState } from "react";

import { FaSignInAlt } from "react-icons/fa";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// import jwt_decode from "jwt-decode";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginSuperAdmin } = useContext(SuperAdminAuthContext);
  const navigate = useNavigate();

  console.log("Email:", email, "Password:", password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Super admin login with token
      const token = await loginSuperAdmin(email, password);

      if (token) {
        localStorage.setItem("token", token); // Store JWT in localStorage
        const decodedToken = jwtDecode(token);
        console.log("Decoded token", decodedToken);
        if (decodedToken.role === "superAdmin") {
          navigate("/super-admin/dashboard"); // Use navigate to redirect
        } else {
          setError("Access denied: invalid role.");
        }
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Super admin login failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center mx-auto">
      <div className="mx-auto p-6 bg-base-300 rounded-md border border-slate-300 shadow-md">
        <h2 className="text-2xl font-bold pb-1 mb-6 border-b border-slate-400 flex items-center">
          <FaSignInAlt className="mr-2" /> Super Admin Login
        </h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Super Admin Email"
            className="input input-bordered input-sm w-full mb-2 max-w-full"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="input input-bordered input-sm w-full mb-2 max-w-full"
            required
          />
          <div className="">
            <button type="submit" className="btn btn-sm btn-active btn-primary">
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaSignInAlt />
              )}
              {loading ? " Logging in..." : " Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;

import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserCog } from "react-icons/fa";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { loginSuperAdmin } = useContext(SuperAdminAuthContext);
  const navigate = useNavigate();

  console.log("Email:", email, "Password:", password);

  const handlePasswordViewToggler = () => {
    setOpen((prev) => !prev);
  };
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
          navigate("/super-admin"); // Use navigate to redirect
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
      <div className="mx-auto p-6 bg-base-300 dark:bg-base-content/70 rounded-md border border-slate-300 dark:border-base-content/15 shadow-md w-full max-w-sm lg:space-y-6 space-y-3">
        <div className="space-y-1 border-b border-base-content/25 dark:border-slate-600 pb-2 text-center">
          <h2 className="lg:text-center lg:text-2xl text-lg font-bold text-base-content/90 admin-dark:text-slate-400 flex justify-center items-center gap-2">
            Bishwajit.dev •
            <span className="text-base-content/90 dark:text-slate-400 font-extrabold">
              Portfolio
            </span>
          </h2>
          <h2 className="text-sm font-bold flex justify-center items-center gap-2 text-base-content/80 admin-dark:text-slate-400">
            <FaUserCog />
            Super Admin • Login
          </h2>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="lg:space-y-4 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
            className="input input-bordered input-sm dark:bg-base-content/5 dark:border-slate-600 w-full py-1 max-w-full"
            required
          />
          <div className="relative">
            <input
              type={open ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              className="input input-bordered input-sm dark:bg-base-content/5 dark:border-slate-600 w-full py-1 max-w-full"
              required
            />
            <span
              onClick={handlePasswordViewToggler}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {open ? (
                <FaEye className="dark:text-slate-600" />
              ) : (
                <FaEyeSlash className="dark:text-slate-600" />
              )}
            </span>
          </div>

          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={loading}
            icon={
              loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaSignInAlt />
              )
            }
            label={loading ? "Logging In..." : "Log In"}
          />
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;

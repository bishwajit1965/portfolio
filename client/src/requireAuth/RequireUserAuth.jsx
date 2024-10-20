import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const RequireUserAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireUserAuth;

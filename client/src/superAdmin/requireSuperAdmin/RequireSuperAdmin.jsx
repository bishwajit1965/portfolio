// Higher-order component for role-based protection

import { Navigate } from "react-router-dom";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import { useContext } from "react";

const RequireSuperAdmin = ({ children }) => {
  const { user, loading } = useContext(SuperAdminAuthContext);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  if (!user || user.role !== "superAdmin") {
    return <Navigate to="/super-admin/login" />;
  }

  return children;
};

export default RequireSuperAdmin;

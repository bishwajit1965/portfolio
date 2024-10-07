import Admin from "/assets/bishwajit-1.jpg";
import AdminInfoCard from "./AdminInfoCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const AdminInfoSection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "admin-info",
    queryParams
  );
  console.log("Admin Data:", { data });
  if (loading) <div> loading...</div>;
  if (error) <div>Error: {error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <div>
      {data.length > 0
        ? data
            .slice(0, 1)
            .map((adminInfo) => (
              <AdminInfoCard
                key={adminInfo._id}
                adminInfo={adminInfo}
                Admin={Admin}
              />
            ))
        : ""}
    </div>
  );
};

export default AdminInfoSection;

import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import SuperAdminDashboardCard from "./SuperAdminDashboardCard";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { useContext } from "react";

const SuperAdminDashboard = () => {
  const { user } = useContext(SuperAdminAuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <SuperAdminPageTitle
        title="Super Admin"
        decoratedText="Dashboard Home"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur praesentium numquam nesciunt sequi, aliquam quia accusantium quae."
      />

      <h1>Welcome, {user.email}</h1>
      <p>Your role: {user.role}</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4 lg:my-10 my-4">
        <SuperAdminDashboardCard />
        <SuperAdminDashboardCard />
        <SuperAdminDashboardCard />
        <SuperAdminDashboardCard />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

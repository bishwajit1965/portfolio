import AdminDashboardCard from "./AdminDashboardCard";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Super Admin Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between gap-4">
        <AdminDashboardCard />
        <AdminDashboardCard />
        <AdminDashboardCard />
        <AdminDashboardCard />
      </div>
    </div>
  );
};

export default AdminDashboard;

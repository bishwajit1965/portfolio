import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import SuperAdminNavBar from "../superAdminNavBar/SuperAdminNavBar";
import { useContext } from "react";
import SuperAdminFooter from "../superAdminDashboard/SuperAdminFooter";

const SuperAdminLayout = () => {
  const { loading, user, logoutSuperAdmin } = useContext(SuperAdminAuthContext);
  return (
    <div className="lg:max-w-full mx-auto">
      <div className="header bg-slate-300 sticky top-0 z-50">
        <SuperAdminNavBar
          logoutSuperAdmin={logoutSuperAdmin}
          loading={loading}
          user={user}
        />
      </div>
      <div className="grid lg:grid-cols-12 gap-2 justify-between">
        <div className="lg:col-span-3 col-span-6 bg-base-200 p-2 rounded-b-lg sticky top-28">
          <SideNav user={user} />
        </div>
        <div className="lg:col-span-9 col-span-6 border border-b rounded-lg">
          <Outlet />
          <SuperAdminFooter />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

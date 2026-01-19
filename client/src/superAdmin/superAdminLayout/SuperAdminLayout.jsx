import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import SuperAdminNavBar from "../superAdminNavBar/SuperAdminNavBar";
import { useContext } from "react";
import { FaCogs } from "react-icons/fa";
import SuperAdminFooter from "../superAdminDashboard/SuperAdminFooter";

const SuperAdminLayout = () => {
  const { loading, user, logoutSuperAdmin } = useContext(SuperAdminAuthContext);
  return (
    <div>
      <div className="lg:max-w-7xl mx-auto">
        <div className="header bg-slate-300">
          <SuperAdminNavBar
            logoutSuperAdmin={logoutSuperAdmin}
            loading={loading}
            user={user}
          />
        </div>
        <div className="grid lg:grid-cols-12 gap-2 justify-between">
          <div className="lg:col-span-3 col-span-6 bg-base-200 p-2 rounded-b-lg">
            <h2 className="text-xl font-bold border-b border-slate-300 mb-2 pb-2 flex items-center gap-2">
              <FaCogs /> Super Admin Dashboard
            </h2>
            <SideNav />
          </div>
          <div className="lg:col-span-9 col-span-6 border border-b rounded-lg">
            <Outlet />

            <div className="">
              <SuperAdminFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

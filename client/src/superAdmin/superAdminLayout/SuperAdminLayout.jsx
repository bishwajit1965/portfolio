import { Outlet } from "react-router-dom";
import SideNav from "../sideNav/SideNav";
import { SuperAdminAuthContext } from "../context/SuperAdminAuthProvider";
import SuperAdminNavBar from "../superAdminNavBar/SuperAdminNavBar";
import { useContext, useState } from "react";
import SuperAdminFooter from "../superAdminDashboard/SuperAdminFooter";

const SuperAdminLayout = () => {
  const { loading, user, logoutSuperAdmin } = useContext(SuperAdminAuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="lg:max-w-full mx-auto">
      <div className="header bg-slate-300 sticky top-0 z-50">
        <SuperAdminNavBar
          logoutSuperAdmin={logoutSuperAdmin}
          loading={loading}
          user={user}
          onMenuClick={() => setIsSidebarOpen(true)}
          onBtnClick={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
      </div>
      <div className="grid lg:grid-cols-12 gap-2 justify-between">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-100 opacity-80 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div
          className={`lg:col-span-2 col-span-6 bg-base-200 p-2 rounded-b-sm fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0 lg:w-auto z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SideNav user={user} />
        </div>
        <div className="lg:col-span-10 col-span-6 border border-b rounded-lg">
          <Outlet />

          <SuperAdminFooter />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

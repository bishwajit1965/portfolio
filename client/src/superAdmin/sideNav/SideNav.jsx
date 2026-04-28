import {
  FaArrowAltCircleRight,
  FaMailBulk,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AdminImage from "../../assets/bishwajit-1.jpg";

const iconBase = "text-lg transition-colors duration-200";

const iconActive = "text-amber-600 admin-dark:text-amber-400";

const iconInactive = "text-slate-500 admin-dark:text-slate-400";

const navItemBase =
  "flex items-center gap-2 w-full py-1.5 px-0.5 transition-all duration-200";

const navItemActive =
  "bg-base-300 admin-dark:bg-slate-700 text-base-content admin-dark:text-white font-bold border-l-4 border-amber-600 admin-dark:border-amber-400 rounded-r-sm";

const navItemInactive =
  "text-gray-600 hover:bg-base-200 hover:text-base-content admin-dark:text-slate-400 admin-dark:hover:bg-slate-600 admin-dark:hover:text-white rounded-r-sm";

const navLinks = [
  { to: "/super-admin", label: "Super Admin Home", end: true },
  { to: "/super-admin/manage-projects", label: "Projects" },
  { to: "/super-admin/manage-testimonials", label: "Testimonials" },
  { to: "/super-admin/manage-users", label: "Users" },
  { to: "/super-admin/manage-hobby", label: "Hobbies" },
  { to: "/super-admin/manage-blogs", label: "Blogs" },
  { to: "/super-admin/manage-categories", label: "Categories" },
  { to: "/super-admin/manage-comments", label: "Comments" },
  { to: "/super-admin/manage-tags", label: "Tags" },
  { to: "/super-admin/manage-notices", label: "Notice" },
  { to: "/super-admin/manage-skills", label: "Skills" },
  {
    to: "/super-admin/manage-portfolio-preferences",
    label: "System Preferences",
  },
];

const SideNav = ({ user }) => {
  return (
    <div className="h-screen sticky top-0 bg-base-200 admin-dark:bg-slate-800 text-slate-800 border-slate-300 admin-dark:border-slate-700 shadow-sm admin-dark:text-slate-400">
      {/* Header */}
      <div className="grid lg:grid-cols-12 grid-cols-1 items-center border-b border-slate-300 admin-dark:border-slate-700 text-slate-800 admin-dark:text-slate-300 py-[8px] px-2">
        <div className="lg:col-span-3 col-span-12">
          <img
            src={AdminImage}
            alt="Admin"
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="lg:col-span-9 col-span-12">
          <h2 className="text-normal font-bold flex items-center gap-2">
            Bishwajit Paul <br />
          </h2>
          <h2 className="text-normal font-bold flex items-center gap-2">
            <span className="text-amber-600 font-bold admin-dark:text-amber-400">
              {" "}
              MERN
            </span>{" "}
            Developer
          </h2>
        </div>
      </div>
      {/* Super Admin Info */}
      <div className="border-b border-slate-300 admin-dark:border-slate-700 py-2 pl-2 admin-dark:bg-slate-800 text-slate-800 admin-dark:text-slate-300">
        <h2 className="text-[15px] font-bold flex items-center gap-2">
          <FaTachometerAlt /> Super Admin
          <span className="text-amber-600 font-bold admin-dark:text-amber-400">
            Dashboard
          </span>
        </h2>

        <p className="text-xs flex items-center gap-2">
          <FaMailBulk />
          {user?.email} ||
          <span className="capitalize text-slate-900 font-bold admin-dark:text-amber-400">
            {user?.role}
          </span>
        </p>
      </div>

      {/* Nav Items */}
      <div className="pl-2">
        <ul className="divide-y divide-slate-300 admin-dark:divide-slate-700 rounded-b-lg max-h-[calc(100vh-162px)] overflow-y-auto">
          {navLinks.map((item, index) => (
            <li key={index} className="list-none p-0">
              <NavLink
                to={item.to}
                end={item.end || false}
                className={({ isActive }) =>
                  `ml-0 ${navItemBase} ${isActive ? navItemActive : navItemInactive}`
                }
              >
                {({ isActive }) => (
                  <>
                    <FaArrowAltCircleRight
                      className={`${iconBase} ${
                        isActive ? iconActive : iconInactive
                      }`}
                    />
                    <span className="admin-dark:text-slate-300">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="bg-base-300 p-2 absolute bottom-0 left-0 right-0 w-full overflow-x-hidden border-t border-slate-300 admin-dark:border-slate-600 admin-dark:bg-gray-800 admin-dark:text-slate-300">
          <p className="flex items-center gap-2 text-sm">
            <FaUser />
            Welcome to || Bishwajit.dev
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

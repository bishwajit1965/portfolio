import {
  FaArrowAltCircleRight,
  FaMailBulk,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AdminImage from "../../assets/bishwajit-1.jpg";

const navItemBase =
  "flex items-center gap-2 w-full py-1.5 px-0.5 transition-all duration-200";

const navItemActive =
  "bg-base-300 text-base-content font-bold border-l-4 border-amber-600 rounded-r-sm";

const navItemInactive =
  "text-gray-600 hover:bg-base-200 hover:text-base-content";

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
];

const SideNav = ({ user }) => {
  return (
    <div className="h-screen sticky top-0 bg-base-200 border-r border-slate-300 shadow-sm">
      {/* Header */}
      <div className="grid lg:grid-cols-12 grid-cols-1 items-center border-b border-slate-300 py-2.5 p-2">
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
            <span className="text-amber-600 font-bold"> MERN</span> Developer
          </h2>
        </div>
      </div>
      {/* Super Admin Info */}
      <div className="border-b border-slate-300 py-2 pl-2">
        <h2 className="text-[15px] font-bold flex items-center gap-2">
          <FaTachometerAlt /> Super Admin
          <span className="text-amber-600 font-bold">Dashboard</span>
        </h2>

        <p className="text-xs flex items-center gap-2">
          <FaMailBulk />
          {user?.email} ||
          <span className="capitalize">{user?.role}</span>
        </p>
      </div>

      {/* Nav Items */}
      <div className="pl-2">
        <ul className="divide-y divide-slate-300 rounded-b-lg max-h-[calc(100vh-162px)] py- overflow-y-auto">
          {navLinks.map((item, index) => (
            <li key={index} className="list-none p-0">
              <NavLink
                to={item.to}
                end={item.end || false}
                className={({ isActive }) =>
                  `ml-0 ${navItemBase} ${isActive ? navItemActive : navItemInactive}`
                }
              >
                <FaArrowAltCircleRight className="text-sm" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="bg-base-300 p-2 absolute bottom-0 left-0 right-0 w-full overflow-x-hidden border-t border-slate-300">
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

import { FaArrowAltCircleRight, FaCogs, FaMailBulk } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideNav = ({ user }) => {
  return (
    <div className="sticky top-20">
      <div className="border-b border-slate-300 mb-2 pb-2">
        <h2 className="lg:text-xl text-lg font-bold  flex items-center gap-2">
          <FaCogs /> Super Admin Dashboard
        </h2>
        <p className="text-sm flex items-center gap-2">
          <FaMailBulk />
          {user && user?.email}
        </p>
      </div>
      <ul className="divide-y-2 divide-slate-300 space-y-1 rounded-b-lg">
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/dashboard">Super Admin Home</NavLink>
        </li>

        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-projects">
            Projects Management
          </NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-testimonials">
            Testimonials Management
          </NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-users">Users Management</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-hobby">Hobby Management</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-blogs">Blogs Management</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-categories">
            Categories Management
          </NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-comments">
            Comments Management
          </NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-tags">Tags Management</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-notices">Notice Management</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-skills">Skills Management</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;

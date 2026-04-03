import { FaArrowAltCircleRight, FaCogs, FaMailBulk } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideNav = ({ user }) => {
  return (
    <div className="sticky top-20">
      <div className="border-b border-slate-300 mb-2 pb-2">
        <h2 className="lg:text-xl text-[18p7] font-bold flex items-center gap-2">
          <FaCogs /> Super Admin DB
        </h2>
        <p className="text-xs flex items-center gap-2">
          <FaMailBulk />
          {user && user?.email} || {user.role}
        </p>
      </div>
      <ul className="divide-y-2 divide-slate-300 space-y-1 rounded-b-lg max-h-screen py-4 overflow-y-auto">
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin" end>
            Super Admin Home
          </NavLink>
        </li>

        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-projects">Projects</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-testimonials">Testimonials</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-users">Users</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-hobby">Hobbies</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-blogs">Blogs</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-categories">Categories</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-comments">Comments</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-tags">Tags</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-notices">Notice</NavLink>
        </li>
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/manage-skills">Skills</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;

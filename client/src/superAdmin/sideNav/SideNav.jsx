import { FaArrowAltCircleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div>
      <ul className="divide-y-2 divide-slate-300 space-y-">
        <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/dashboard">Super Admin Home</NavLink>
        </li>
        {/* <li className="flex items-center hover:bg-base-300 py-1">
          <FaArrowAltCircleRight />
          <NavLink to="/super-admin/add-project">Add Project</NavLink>
        </li> */}
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
      </ul>

      <div className="">
        <div className="py-1">
          <h2 className="font-bold text-xl">Blog Posts Management</h2>
        </div>
        <ul className="divide-y-2 divide-slate-300 space-y-">
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
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

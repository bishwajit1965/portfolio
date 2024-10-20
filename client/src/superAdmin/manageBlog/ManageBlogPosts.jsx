import { FaPlusCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";

const ManageBlogPosts = () => {
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Manage Blogs</title>
      </Helmet>

      <div>
        <SuperAdminPageTitle
          title="Manage"
          decoratedText="Blog Posts"
          subtitle="Super admin can only manage all blog posts"
        />
        <NavLink to="/super-admin/add-blog-post" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Add Blog Post
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default ManageBlogPosts;

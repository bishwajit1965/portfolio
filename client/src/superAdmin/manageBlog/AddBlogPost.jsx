import { FaBlogger } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";

const AddBlogPost = () => {
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Add Blog</title>
      </Helmet>

      <div>
        <SuperAdminPageTitle
          title="Add"
          decoratedText="Blog Posts"
          subtitle="Super admin can only manage all blog posts"
        />

        <NavLink to="/super-admin/manage-blogs" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaBlogger />
            Manage Blog Post
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default AddBlogPost;

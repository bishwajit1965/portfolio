import AboutMeSection from "../components/sections/about/AboutMeSection";
import AddBlogPost from "../superAdmin/manageBlog/AddBlogPost";
import AddCategories from "../superAdmin/manageCategories/AddCategories";
import AddNotice from "../superAdmin/manageNotice/AddNotice";
import AddProjectForm from "../superAdmin/manageProjects/AddProjectForm";
import AddTag from "../superAdmin/manageTags/AddTag";
import AdminDashboard from "../superAdmin/adminDashboard/AdminDashboard";
import BlogPosts from "../components/blog/BlogPosts";
import BookmarksPage from "../pages/bookmarksPage/BookmarksPage";
import ComingSoon from "../components/blog/ComingSoon";
import ContactMe from "../components/sections/contact/ContactMe";
import ErrorPage from "../components/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ManageBlogPosts from "../superAdmin/manageBlog/ManageBlogPosts";
import ManageCategories from "../superAdmin/manageCategories/ManageCategories";
import ManageComments from "../superAdmin/manageComments/ManageComments";
import ManageHobby from "../superAdmin/manageHobby/ManageHobby";
import ManageNotice from "../superAdmin/manageNotice/ManageNotice";
import ManageProjects from "../superAdmin/manageProjects/ManageProjects";
import ManageTags from "../superAdmin/manageTags/ManageTags";
import ManageTestimonials from "../superAdmin/manageTestimonials/ManageTestimonials";
import ManageUsers from "../superAdmin/manageUsers/ManageUsers";
import NoticePage from "../components/noticePage/NoticePage";
import ProjectDetails from "../components/projectDetails/ProjectDetails";
import ProjectUpdateForm from "../superAdmin/manageProjects/ProjectUpdateForm";
import RequireSuperAdmin from "../superAdmin/requireSuperAdmin/RequireSuperAdmin";
import RootLayout from "../layout/RootLayout";
import RssPage from "../pages/rss/RssPage";
import SignUp from "../pages/signUp/SignUp";
import SingleBlogPost from "../components/blog/SingleBlogPost";
import SuperAdminDashboard from "../superAdmin/superAdminDashboard/SuperAdminDashboard";
import SuperAdminLayout from "../superAdmin/superAdminLayout/SuperAdminLayout";
import SuperAdminLogin from "../superAdmin/pages/SuperAdminLogin";
import ViewProjectDetails from "../superAdmin/manageProjects/ViewProjectDetail";
import { createBrowserRouter } from "react-router-dom";
import ManageSkills from "../superAdmin/manageSkills/ManageSkills";
import AddSkills from "../superAdmin/manageSkills/AddSkills";
import PortfolioProjects from "../pages/portfolioProjects/PortfolioProjects";
import AddTestimonialForm from "../superAdmin/manageTestimonials/AddTestimonialForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog-posts",
        element: <BlogPosts />,
      },
      {
        path: "/portfolio-projects",
        element: <PortfolioProjects />,
      },
      {
        path: "/blog-coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "/single-blog-post/:postId",
        element: <SingleBlogPost />,
        loader: async ({ params }) => {
          const postResponse = await fetch(
            `http://localhost:5000/api/blogPosts/${params.postId}`,
          );
          const post = await postResponse.json();
          return { post };
        },
      },
      {
        path: "/pdf",
        element: <NoticePage />,
      },
      {
        path: "bookmarked-posts",
        element: <BookmarksPage />,
      },
      {
        path: "/contact-me",
        element: <ContactMe />,
      },
      {
        path: "/about-me",
        element: <AboutMeSection />,
      },
      {
        path: "/project-details/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/rss",
        element: <RssPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  // Super admin login route (not protected)
  {
    path: "/super-admin/login",
    element: <SuperAdminLogin />,
  },
  // Super admin dashboard routes (protected)
  {
    path: "/super-admin",
    element: (
      <RequireSuperAdmin>
        <SuperAdminLayout />
      </RequireSuperAdmin>
    ),
    children: [
      {
        path: "dashboard",
        element: <SuperAdminDashboard />,
      },
      {
        path: "add-project",
        element: <AddProjectForm />,
      },
      {
        path: "manage-projects",
        element: <ManageProjects />,
      },
      {
        path: "edit-project-details/:projectId",
        element: <ProjectUpdateForm />,
      },
      {
        path: "view-project-details/:projectId",
        element: <ViewProjectDetails />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-blog-post",
        element: <AddBlogPost />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogPosts />,
      },
      {
        path: "manage-comments",
        element: <ManageComments />,
      },
      {
        path: "add-categories",
        element: <AddCategories />,
      },
      {
        path: "manage-categories",
        element: <ManageCategories />,
      },
      {
        path: "manage-tags",
        element: <ManageTags />,
      },
      {
        path: "add-tag",
        element: <AddTag />,
      },
      {
        path: "add-testimonials",
        element: <AddTestimonialForm />,
      },
      {
        path: "manage-testimonials",
        element: <ManageTestimonials />,
      },
      {
        path: "manage-hobby",
        element: <ManageHobby />,
      },
      {
        path: "add-notice",
        element: <AddNotice />,
      },
      {
        path: "manage-notices",
        element: <ManageNotice />,
      },
      {
        path: "add-skills",
        element: <AddSkills />,
      },
      {
        path: "manage-skills",
        element: <ManageSkills />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;

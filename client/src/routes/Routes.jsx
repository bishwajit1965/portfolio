import AboutMeSection from "../components/sections/about/AboutMeSection";
import ContactMeForm from "../components/sections/contact/ContactMeForm";
import ErrorPage from "../components/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ProjectDetails from "../components/projectDetails/ProjectDetails";
import ProjectForm from "../components/projectForm/ProjectForm";
import ProjectUpdateForm from "../components/projects/ProjectUpdateForm";
import RootLayout from "../layout/RootLayout";
import SignUp from "../pages/signUp/SignUp";
import SuperAdminDashboard from "../pages/superAdminDashboard/SuperAdminDashboard";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/contact-me",
        element: <ContactMeForm />,
      },
      {
        path: "/add-project",
        element: (
          <PrivateRoute>
            <ProjectForm />,
          </PrivateRoute>
        ),
      },
      {
        path: "/about-me",
        element: <AboutMeSection />,
      },
      {
        path: "/projects/edit/:projectId",
        element: (
          <PrivateRoute>
            <ProjectUpdateForm />,
          </PrivateRoute>
        ),
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
        path: "/super-admin-dashboard",
        element: <SuperAdminDashboard />,
        // <PrivateRoute requiredRole="super-admin">
        // ((),
        // {
        /* </PrivateRoute> */
        // }),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;

import "./index.css";

import AuthProvider from "./providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import SuperAdminAuthProvider from "./superAdmin/context/SuperAdminAuthProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";
import AdminThemeProvider from "./providers/AdminThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SuperAdminAuthProvider>
      <AuthProvider>
        <AdminThemeProvider>
          <ThemeProvider>
            <HelmetProvider>
              <RouterProvider router={router} />
            </HelmetProvider>
          </ThemeProvider>
        </AdminThemeProvider>
      </AuthProvider>
    </SuperAdminAuthProvider>
  </StrictMode>,
);

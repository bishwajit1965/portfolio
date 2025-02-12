import "./index.css";

import AuthProvider from "./providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import SuperAdminAuthProvider from "./superAdmin/context/SuperAdminAuthProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SuperAdminAuthProvider>
      <AuthProvider>
        <ThemeProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </ThemeProvider>
      </AuthProvider>
    </SuperAdminAuthProvider>
  </StrictMode>
);

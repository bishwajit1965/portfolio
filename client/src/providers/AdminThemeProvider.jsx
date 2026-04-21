import { createContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

// Create the theme context
export const AdminThemeContext = createContext();

const AdminThemeProvider = ({ children }) => {
  const [adminTheme, setAdminTheme] = useState("admin-light"); //Default theme is light
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved theme on initial load
    const savedTheme = localStorage.getItem("adminTheme") || "admin-light";

    if (savedTheme) {
      setAdminTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      document.classList.add("admin-light");
    }
    setIsLoading(false); // Turn off loading once setup is done
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const toggleAdminTheme = () => {
    const newTheme =
      adminTheme === "admin-light" ? "admin-dark" : "admin-light";
    setAdminTheme(newTheme);
    localStorage.setItem("adminTheme", newTheme); // Save theme in localStorage
    document.body.classList.remove(adminTheme); // Remove old theme from body
    document.body.classList.add(newTheme); // Apply new theme to body
  };

  return (
    <AdminThemeContext.Provider value={{ adminTheme, toggleAdminTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export default AdminThemeProvider;

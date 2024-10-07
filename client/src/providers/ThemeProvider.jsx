import { createContext, useEffect, useState } from "react";

// Create the theme context
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); //Default theme is light
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for saved theme on initial load
    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      document.classList.add("light");
    }
    setIsLoading(false); // Turn off loading once setup is done
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme in localStorage
    document.body.classList.remove(theme); // Remove old theme from body
    document.body.classList.add(newTheme); // Apply new theme to body
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

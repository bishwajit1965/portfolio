import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status(403) || error.response.status(401)) {
      // Redirect to login page with an error message
      localStorage.removeItem("jwt");
      window.location.href = "/login?error=tokenExpired";
    }
    return Promise.reject(error);
  }
);

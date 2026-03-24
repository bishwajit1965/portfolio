import fetchWithAuth from "./fetchWithAuth";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const supAdminDashboardStatusApi = {
  // Get all blog post
  async getAllBlogPosts() {
    return await fetchWithAuth(`${baseURL}/blogPosts`, {
      method: "GET",
    });
  },

  // Get all projects
  async getProjects() {
    return await fetchWithAuth(`${baseURL}/projects`, {
      method: "GET",
    });
  },

  // Get all notices
  async listNotice() {
    return await fetchWithAuth(`${baseURL}/notices`, {
      method: "GET",
    });
  },

  // Get all users
  async getUsersForSuperAdmin() {
    return await fetchWithAuth(`${baseURL}/users`, {
      method: "GET",
    });
  },

  // Get all categories
  async getAllCategories() {
    return await fetchWithAuth(`${baseURL}/categories`, {
      method: "GET",
    });
  },
};

export default supAdminDashboardStatusApi;

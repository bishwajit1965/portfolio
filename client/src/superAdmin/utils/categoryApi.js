import { API_BASE_URL } from "../../utils/api";
import fetchWithAuth from "./fetchWithAuth";

const apiUrl = `${API_BASE_URL}/categories`;

const categoryApi = {
  async getAllCategories() {
    const response = await fetchWithAuth(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    return await response.json();
  },
};

export default categoryApi;

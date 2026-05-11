import { API_BASE_URL } from "../../utils/api";
import fetchWithAuth from "./fetchWithAuth";

const apiUrl = `${API_BASE_URL}/tags`;

const tagApi = {
  async getAllTags() {
    const response = await fetchWithAuth(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching tags: ${response.statusText}`);
    }
    return await response.json();
  },
};

export default tagApi;

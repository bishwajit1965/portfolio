// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// if (!API_BASE_URL) {
//   throw new Error("API_BASE_URL missing in env");
// }

// export { API_BASE_URL };

const DEV_URL = "http://localhost:5000/api";
const PROD_URL = "https://portfolio-wcsw.onrender.com/api";

export const API_BASE_URL =
  import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;

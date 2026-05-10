const DEV_URL = "http://localhost:5000/api";
const PROD_URL = "https://portfolio-wcsw.onrender.com/api";

export const API_BASE_URL =
  import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;

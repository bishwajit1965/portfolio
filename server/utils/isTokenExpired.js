import jwtDecode from "jwt-decode";

const isTokenExpired = async (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // checks expiration time
  } catch (error) {
    return true;
  }
};

module.exports = { isTokenExpired };

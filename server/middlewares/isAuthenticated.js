const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //Usually the token is sent in the authorization header

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: No token is provided." });
  }

  // Remove "Bearer " from the token string (if the token is prefixed with Bearer)
  const token = authHeader.split(" ")[1];
  console.log("Auth header", authHeader);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token format is incorrect." });
  }

  // Verify token and decode
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Attach the decoded token to the request for further use (e.g., user ID )
    console.log("Decoded token", decoded);

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

module.exports = { isAuthenticated };

// const verifyRole = (requiredRole) => {
//   return (req, res, next) => {
//     if (req.user.role !== requiredRole) {
//       return res.status(403).json({ message: "Forbidden: Insufficient role" });
//     }
//     next(); // Proceed if role matches
//   };
// };

// module.exports = verifyRole;

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to verify JWT and roles
const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token from Authorization header
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // Check if the user's role matches the required role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({
          message: `Access denied: Only ${requiredRole}s can access this resource`,
        });
      }

      req.user = decoded; // Attach decoded user data (including role) to the request object
      next(); // Proceed to the next middleware or route handler
    });
  };
};

module.exports = verifyRole;

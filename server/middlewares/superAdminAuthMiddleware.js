const jwt = require("jsonwebtoken");

const superAdminAuthMiddleware = () => {
  const token = req.headers.authorization?.split(" ")[1]; //Bearer token
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Access denied: not a super admin" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = superAdminAuthMiddleware;

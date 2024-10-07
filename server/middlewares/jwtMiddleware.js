const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const verifyJWT = (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;

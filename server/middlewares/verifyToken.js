const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Set user data if token is verified
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

// const admin = require("../config/firebaseAdmin");
// const User = require("../models/User");

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     // Verify the token using Firebase Admin SDK
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const userModel = new User();
//     const user = await userModel.findUserByEmail(decodedToken.email);
//     if (!user) {
//       res.status(403).json({ message: "Unauthorized: user not found" });
//     }
//     req.user = { ...decodedToken, role: user.role }; // Attach decoded token to the request object
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }
// };

// module.exports = verifyToken;

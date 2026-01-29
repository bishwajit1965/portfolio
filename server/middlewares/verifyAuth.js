const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ message: "Unauthorized, no token provided" });
  // }

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userInstance = new User();

    // Find MongoDB user by Firebase `uid` stored in the token
    const user = await userInstance.findUserByEmail(decoded.email); // Assuming you've a `findUserByUid` method

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAuth;

// const jwt = require("jsonwebtoken");

// const verifyAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyAuth;

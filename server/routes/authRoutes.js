const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");

const {
  getCurrentUser,
  registerUser,
  googleLogin,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

//Route for user Login
router.post("/login", loginUser);

// Google login
router.post("/google-login", googleLogin);

//New route to get the current user's info
router.get("/currentUser", verifyToken, (req, res) => {
  // Return the authenticated user's data
  res.status(200).json({ email: req.user.email, role: req.user.role }); // Send back decoded token information
});

// router.get("/currentUser", verifyToken, getCurrentUser);

// Route for user registration
router.post("/register", registerUser);

module.exports = router;

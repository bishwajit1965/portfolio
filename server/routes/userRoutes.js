const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/userController");

const verifyRole = require("../middlewares/verifyRole");

const router = express.Router();

// Route to get all users (accessible by super-admin)
router.get("/", verifyRole("super-admin"), getAllUsers);
router.get("/", getAllUsers);

// Route to update user role (accessible by super-admin)
router.patch("/:id/role", verifyRole("super-admin"), updateUserRole);

// Example of protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` });
});

module.exports = router;

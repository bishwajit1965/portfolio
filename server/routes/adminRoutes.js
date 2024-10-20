const express = require("express");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const verifyToken = require("../middlewares/verifyToken");
const verifySuperAdmin = require("../middlewares/verifySuperAdmin");
const verifyRole = require("../middlewares/verifyRole");

const router = express.Router();

// Route to get all users (Super Admin access only)
router.get(
  "/users",
  // verifyToken,
  verifyRole("superAdmin"),
  verifySuperAdmin,
  getAllUsers
);

// Route to update a user's role (Super Admin access only)
router.patch(
  "/users/:id/role",
  // verifyToken,
  // verifySuperAdmin,
  updateUserRole
);

// Route to delete a user (Super Admin access only)
router.delete(
  "/users/:id",
  // verifyToken,
  // verifyRole("superAdmin"),
  deleteUser
);

module.exports = router;

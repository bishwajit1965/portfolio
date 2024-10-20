const express = require("express");
const {
  superAdminLogin,
  getCurrentSuperAdmin,
} = require("../controllers/superAdminAuthController");

const verifySuperAdminToken = require("../middlewares/verifySuperAdminToken");

const router = express.Router();

// Super Admin Login Route
router.post("/login", superAdminLogin);

// Get Current Super Admin Info (Authenticated Route)
router.get(
  "/super-admin/dashboard",
  verifySuperAdminToken,
  getCurrentSuperAdmin
);

module.exports = router;

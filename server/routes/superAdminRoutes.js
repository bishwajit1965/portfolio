const express = require("express");
const {
  superAdminLogin,
  getSuperAdminDashboard,
  getDashboardStats,
} = require("../controllers/superAdminController");

const verifySuperAdmin = require("../middlewares/verifySuperAdmin");

const router = express.Router();

// const { verifyRole } = require("../middlewares/verifyRole");

// Super Admin login route
router.post("/super-admin/login", superAdminLogin);
router.get("/super-admin/dashboard", verifySuperAdmin, getSuperAdminDashboard);
router.get("/super-admin/stats", verifySuperAdmin, getDashboardStats);

module.exports = router;

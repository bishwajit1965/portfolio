const express = require("express");
const {
  superAdminLogin,
  getSuperAdminDashboard,
} = require("../controllers/superAdminController");

const verifySuperAdmin = require("../middlewares/verifySuperAdmin");

const router = express.Router();

// Super Admin login route
router.post("/super-admin/login", superAdminLogin);
router.get("/super-admin/dashboard", verifySuperAdmin, getSuperAdminDashboard);

module.exports = router;

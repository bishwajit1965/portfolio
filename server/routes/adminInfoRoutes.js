const express = require("express");
const router = express.Router();

const {
  createAdminInfo,
  getAdminInfoById,
  getAllAdminInfos,
  updateAdminInfoById,
  deleteAdminInfoById,
} = require("../controllers/adminInfoController");

const {
  validateAdminInfo,
  validateAdminInfoById,
} = require("../middlewares/validateAdminInfoData");

router.post("/", validateAdminInfo, createAdminInfo);
router.get("/:id", validateAdminInfoById, getAdminInfoById);
router.get("/", getAllAdminInfos);
router.patch(
  "/:id",
  validateAdminInfoById,
  validateAdminInfo,
  updateAdminInfoById
);
router.delete("/:id", validateAdminInfoById, deleteAdminInfoById);

module.exports = router;

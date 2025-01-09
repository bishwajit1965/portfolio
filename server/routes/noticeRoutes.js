const express = require("express");

const {
  addNotice,
  listNotice,
  getSingleNotice,
  editNotice,
  removeNotice,
  generateNoticePdf,
} = require("../controllers/noticeController");
const verifyAuth = require("../middlewares/verifyAuth");
const verifyRole = require("../middlewares/verifyRole");

const router = express.Router();

router.post("/", addNotice);
router.get("/", listNotice);
router.get("/:id", getSingleNotice);
router.patch("/:id", verifyRole("superAdmin"), editNotice);
router.delete("/:id", verifyRole("superAdmin"), removeNotice);
router.get("/generate-pdf/:id", generateNoticePdf);

module.exports = router;

const express = require("express");

const {
  createBriefIntro,
  getIntroById,
  getAllIntros,
  updateIntroById,
  deleteIntroById,
} = require("../controllers/briefIntroController");

const {
  validateBriefIntro,
  validateBriefIntroById,
} = require("../middlewares/validateBriefIntro");

const router = express.Router();

router.post("/", createBriefIntro);
router.get("/:id", getIntroById);
router.get("/", getAllIntros);
router.patch(
  "/:id",
  validateBriefIntro,
  validateBriefIntroById,
  updateIntroById
);

router.delete("/:id", deleteIntroById);

module.exports = router;

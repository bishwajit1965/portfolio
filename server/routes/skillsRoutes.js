const express = require("express");

const {
  createSkills,
  getSkill,
  getSkills,
  updateSkillsById,
  deleteSkillsById,
} = require("../controllers/skillsController");

const {
  validateSkillsData,
  validateSkillsById,
} = require("../middlewares/validateSkillsData");

const router = express.Router();

router.post("/", validateSkillsData, createSkills);
router.get("/:id", validateSkillsById, getSkill);
router.get("/", getSkills);
router.patch("/:id", validateSkillsById, validateSkillsData, updateSkillsById);
router.delete("/:id", deleteSkillsById);

module.exports = router;

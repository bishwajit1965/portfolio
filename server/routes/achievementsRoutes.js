const express = require("express");

const {
  validateAchievementsData,
  validateAchievementsById,
} = require("../middlewares/validateAchievementsData");

const {
  createAchievement,
  getAchievementById,
  getAchievements,
  updateAchievementById,
  deleteAchievementById,
} = require("../controllers/AchievementsController");

const router = express.Router();

router.post("/", validateAchievementsData, createAchievement);
router.get("/:id", getAchievementById);
router.get("/", getAchievements);
router.patch(
  "/:id",
  validateAchievementsData,
  validateAchievementsById,
  updateAchievementById
);
router.delete("/:id", validateAchievementsById, deleteAchievementById);

module.exports = router;

const {
  addAchievement,
  getAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
} = require("../models/achievementsModel");

const createAchievement = async (req, res) => {
  try {
    const achievementData = req.body;
    const savedAchievement = await addAchievement(achievementData);
    res.status(201).json({
      message: "Achievement saved successfully",
      message: savedAchievement,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send achievements data", error });
  }
};

const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await getAchievement(id);
    if (achievement) {
      res.status(200).json(achievement);
    } else {
      res.status(404).json({ message: "Achievements data not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve achievements data.", error });
  }
};

const getAchievements = async (req, res) => {
  try {
    const achievements = await getAllAchievements();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve achievements data.".error,
    });
  }
};

const updateAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const achievementData = req.body;
    const result = await updateAchievement(id, achievementData);
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({ message: "Achievements data updated successfully.", result });
    } else {
      res.status(404).json({ message: "Achievement data not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update achievement data", error });
  }
};

const deleteAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAchievement(id);
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Achievement data is deleted successfully." });
    } else {
      res.status(404).json({ message: "Achievement data not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete achievement data." });
  }
};

module.exports = {
  createAchievement,
  getAchievementById,
  getAchievements,
  updateAchievementById,
  deleteAchievementById,
};

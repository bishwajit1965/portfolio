const {
  addSkills,
  getSkillsById,
  getAllSkills,
  updateSkills,
  deleteSkills,
} = require("../models/skillsModel");
const createSkills = async (req, res) => {
  try {
    let { skillName, level, experience, tools, category } = req.body;
    const now = new Date();
    const saveSkills = await addSkills(
      skillName,
      level,
      experience,
      tools,
      category
    );

    res.status(201).json({
      success: true,
      message: "Skills added successfully",
      data: saveSkills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add skills",
      error: error.message,
    });
  }
};

const getSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const skill = await getSkillsById(id);
    if (skill) {
      res.status(200).json(skill);
    } else {
      res.status(404).json({ message: "Skill data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve skill data.", error });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await getAllSkills();
    if (skills) {
      res.status(200).json(skills);
    } else {
      res.status(404).json({ message: "Skills data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve skills data" });
  }
};

const updateSkillsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateSkills(id, req.body);
    if (result.matchedCount > 0 && result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Skills data updated successfully!",
      });
    } else {
      res.status(404).json({ message: "Skills data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update skills data" }, error);
  }
};

const deleteSkillsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteSkills(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Skills data deleted successfully!" });
    } else {
      res.status(404).json({ message: "Skills data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skills data" });
  }
};

module.exports = {
  createSkills,
  getSkill,
  getSkills,
  updateSkillsById,
  deleteSkillsById,
};

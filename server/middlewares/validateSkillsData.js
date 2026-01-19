const { ObjectId } = require("mongodb");

/**
 * Middleware to validate skills data
 * Works for both JSON and FormData
 */
const validateSkillsData = (req, res, next) => {
  let { skillName, level, experience, tools, category } = req.body;

  // If tools/category are strings (FormData), try to parse them
  try {
    if (typeof tools === "string") tools = JSON.parse(tools);
    if (typeof category === "string") category = JSON.parse(category);
  } catch (err) {
    return res.status(400).json({
      message: "Tools and category must be valid JSON arrays",
    });
  }

  // Skill name validation
  if (!skillName || typeof skillName !== "string") {
    return res.status(400).json({ message: "Skill name is required" });
  }
  skillName = skillName.trim();
  if (skillName.length < 5 || skillName.length > 50) {
    return res.status(400).json({
      message: "Skill name must be between 5 to 50 characters",
    });
  }

  // Level validation
  if (!level || typeof level !== "string") {
    return res.status(400).json({ message: "Level is required" });
  }
  level = level.trim();
  if (level.length < 2 || level.length > 50) {
    return res.status(400).json({
      message: "Level must be between 2 to 50 characters",
    });
  }

  // Experience validation
  if (!experience || typeof experience !== "string") {
    return res.status(400).json({ message: "Experience is required" });
  }
  experience = experience.trim();
  if (experience.length < 2 || experience.length > 50) {
    return res.status(400).json({
      message: "Experience must be between 2 to 50 characters",
    });
  }

  // Tools validation
  if (!tools || !Array.isArray(tools)) {
    return res.status(400).json({ message: "Tools must be an array" });
  }
  const invalidTools = tools.some(
    (tool) =>
      typeof tool !== "string" ||
      tool.trim().length < 2 ||
      tool.trim().length > 50
  );
  if (invalidTools) {
    return res.status(400).json({
      message: "Each tool must be a string between 2 to 50 characters",
    });
  }

  // Category validation
  if (!category || !Array.isArray(category)) {
    return res.status(400).json({ message: "Category must be an array" });
  }
  const invalidCategory = category.some(
    (cat) =>
      typeof cat !== "string" || cat.trim().length < 2 || cat.trim().length > 50
  );
  if (invalidCategory) {
    return res.status(400).json({
      message: "Each category must be a string between 2 to 50 characters",
    });
  }

  // Trim arrays
  req.body.skillName = skillName;
  req.body.level = level;
  req.body.experience = experience;
  req.body.tools = tools.map((t) => t.trim());
  req.body.category = category.map((c) => c.trim());

  next(); // Pass to controller
};

// Validate MongoDB ObjectId
const validateSkillsById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid skills ID format" });
  }
  next();
};

module.exports = { validateSkillsData, validateSkillsById };

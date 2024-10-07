const { ObjectId } = require("mongodb");

const validateSkillsData = (req, res, next) => {
  const { skillName, level, experience, tools, category } = req.body;
  if (
    !skillName ||
    typeof skillName !== "string" ||
    skillName.trim().length < 5 ||
    skillName.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Skill name must be a string between 5 to 50 characters",
    });
  }

  if (
    !level ||
    typeof level !== "string" ||
    level.trim().length < 5 ||
    level.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Level field must be a string between 5 to 50 characters",
    });
  }

  if (
    !experience ||
    typeof experience !== "string" ||
    experience.trim().length < 2 ||
    experience.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Experience field must be a string between 5 to 50 characters",
    });
  }

  /**
   * TOOLS ARRAY VALIDATION
   */
  // Trim each tool item in the array
  req.body.tools = tools.map((tool) => tool.trim());

  if (!tools || !Array.isArray(tools)) {
    return res.status(400).json({
      message: "Tools field must be an array",
    });
  }
  // Check if all fields in tools array ia a string between 5 to 50 characters
  const isValidTools = req.body.tools.every(
    (tool) =>
      typeof tool === "string" &&
      tool.trim().length >= 3 &&
      tool.trim().length <= 50
  );

  if (!isValidTools) {
    res.status(400).json({
      message: "Each tool must be string between 5 to 50 characters",
    });
  }

  /**
   * CATEGORY ARRAY VALIDATION
   */
  if (!category || !Array.isArray(category)) {
    return res.status(400).json({
      message: "Category field must be an array",
    });
  }

  // Check if all fields in category array ia a string between 5 to 50 characters
  const isValidCategory = req.body.category.every(
    (cat) =>
      typeof cat === "string" &&
      cat.trim().length >= 5 &&
      cat.trim().length <= 50
  );

  if (!isValidCategory) {
    res.status(400).json({
      message: "Each category must be string between 5 to 50 characters",
    });
  }
  // Trim whitespace from validated field
  req.body.skillName = skillName.trim();
  req.body.level = level.trim();

  next();
};

// Validate skills data by ID
const validateSkillsById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid skills ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = { validateSkillsData, validateSkillsById };

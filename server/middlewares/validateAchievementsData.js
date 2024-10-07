const { ObjectId } = require("mongodb");

const validateAchievementsData = (req, res, next) => {
  const { completedProjects, experience, certification, awards } = req.body;

  // Check if completed projects is present, is a string, and has a valid length
  if (
    !completedProjects ||
    typeof completedProjects !== "string" ||
    completedProjects.trim().length < 5 ||
    completedProjects.trim().length > 100
  ) {
    return res.status(400).json({
      message:
        "Completed projects must be a string between 5 to 100 characters.",
    });
  }

  // Check if experience is present, is a string, and has a valid length
  if (
    !experience ||
    typeof experience !== "string" ||
    experience.trim().length < 10 ||
    experience.trim().length > 500
  ) {
    return res.status(400).json({
      message: "Experience must be a string between 10 and 500 characters.",
    });
  }
  // Check if certification is present, is a string, and has a valid length
  if (
    !certification ||
    typeof certification !== "string" ||
    certification.trim().length < 10 ||
    certification.trim().length > 500
  ) {
    return res.status(400).json({
      message: "Certification must be a string between 10 and 500 characters.",
    });
  }

  // Check if awards is present, is a string, and has a valid length
  if (
    !awards ||
    typeof awards !== "string" ||
    awards.trim().length < 10 ||
    awards.trim().length > 500
  ) {
    return res.status(400).json({
      message: "Awards must be a string between 10 and 500 characters.",
    });
  }

  // Trim whitespace from validated fields
  req.body.completedProjects = completedProjects.trim();
  req.body.experience = experience.trim();
  req.body.certification = certification.trim();
  req.body.awards = awards.trim();

  next();
};

// Validate achievements data by ID
const validateAchievementsById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid achievements link ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = { validateAchievementsData, validateAchievementsById };

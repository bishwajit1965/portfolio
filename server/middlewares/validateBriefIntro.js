const { ObjectId } = require("mongodb");

const validateBriefIntro = (req, res, next) => {
  const { briefIntro } = req.body;

  //Validate brief introduction
  if (
    !briefIntro ||
    typeof briefIntro !== "string" ||
    briefIntro.trim().length < 5 ||
    briefIntro.trim().length > 2000
  ) {
    return res.status(400).json({
      message:
        "Brief introduction must be a string between 5 to 2000 characters.",
    });
  }

  next();
};

// Validate social link data by ID
const validateBriefIntroById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid social link ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = { validateBriefIntro, validateBriefIntroById };

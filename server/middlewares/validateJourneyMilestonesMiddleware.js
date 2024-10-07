const { body, validationResult } = require("express-validator");
const { ReadPreference, ObjectId } = require("mongodb");

const validateJourneyMilestonesMiddlewareRules = () => {
  return [
    body("title")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Journey milestone is required and must be a string"),

    body("description")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Journey milestone is required and must be a string "),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Errors", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateJourneyMilestoneById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid journey milestone ID format!" });
  }
  next(); // Proceed to the next middleware or controller
};

module.exports = {
  validateJourneyMilestonesMiddlewareRules,
  validate,
  validateJourneyMilestoneById,
};

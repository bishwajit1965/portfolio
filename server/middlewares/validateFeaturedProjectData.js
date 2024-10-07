const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const featuredProjectValidationRules = () => {
  return [
    body("id")
      .isInt({ min: 1 })
      .withMessage("Id must be an integer and greater than 0"),
    body("title")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Title is required and must be a string."),
    body("description")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Description is required must be a string."),
    body("technologies")
      .isArray({ min: 1 })
      .withMessage("Technologies must be a non-empty array,"),
    body("technologies.*")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Each technology must be a string of 2 characters."),
    body("liveDemo")
      .optional()
      .isURL()
      .withMessage("The live demo must be a valid URL."),
    body("sourceCode").isURL().withMessage("Source code must be a valid URL."),
    body("photoUrl")
      .optional()
      .isURL()
      .withMessage("Photo url must be a valid URL."),
    body("featured")
      .isBoolean()
      .withMessage("Featured must be a boolean value."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateFeaturedProjectById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid featured project ID format!" });
  }
  next(); // Proceed to the next middleware or controller
};

module.exports = {
  featuredProjectValidationRules,
  validate,
  validateFeaturedProjectById,
};

const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const validateCopyrightMiddlewareRules = () => {
  return [
    body("copyrightText")
      .isString()
      .withMessage("Copyright text must be a string.")
      .isLength({ min: 10, max: 200 })
      .withMessage(
        "Copyright text length must be between 10 to 200 characters."
      )
      .trim()
      .notEmpty()
      .withMessage("Copyright text is required."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateCopyrightById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid copyright text ID format!" });
  }
  next(); // Proceed to the next middleware or controller
};

module.exports = {
  validateCopyrightMiddlewareRules,
  validate,
  validateCopyrightById,
};

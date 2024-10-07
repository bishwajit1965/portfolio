const { body, validationResult } = require("express-validator");

const hobbyValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Hobby name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Hobby name must be at least between 2 to 50 characters."),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 2, max: 200 })
      .withMessage("Description must be at least between 2 to 200 characters."),

    body("level")
      .notEmpty()
      .withMessage("Hobby level is required.")
      .isIn(["beginner", "intermediate", "advanced"])
      .withMessage(
        "Hobby level must be one of beginner, intermediate or advanced."
      ),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { hobbyValidationRules, validate };

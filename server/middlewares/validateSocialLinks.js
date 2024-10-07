const { ObjectId } = require("mongodb");

const validateSocialLinks = (req, res, next) => {
  const { platform, url, icon } = req.body;

  if (!platform || typeof platform !== "string") {
    platform.trim().length < 5 || platform.trim().length >= 50;

    return res.status(400).json({
      message: "Platform name must be a string between 5 to 50 characters",
    });
  }

  if (!url) {
    return res.status(400).json({ message: "Url field must be filled up" });
  }

  if (!icon) {
    return res.status(400).json({ message: "Icon field must be filled up" });
  }

  next();
};

// Validate social link data by ID
const validateSocialLinksById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid social link ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = { validateSocialLinks, validateSocialLinksById };

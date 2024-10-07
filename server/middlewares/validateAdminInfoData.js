const { ObjectId } = require("mongodb");

const validateAdminInfo = (req, res, next) => {
  const { name, title, imageUrl } = req.body;

  // Check if names is present, is a string, and has a valid length
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 5 ||
    name.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Name must be a string between 5 to 50 characters.",
    });
  }

  // Check if title is present, is a string, and has a valid length
  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 10 ||
    title.trim().length > 100
  ) {
    return res.status(400).json({
      message: "Title must be a string between 10 and 100 characters.",
    });
  }
  // Check if image url is empty
  if (!imageUrl) {
    return res.status(400).json({
      message: "Image url must be filled up.",
    });
  }

  // Trim whitespace from validated fields
  req.body.name = name.trim();
  req.body.title = title.trim();
  req.body.imageUrl = imageUrl.trim();

  next();
};

// Validate achievements data by ID
const validateAdminInfoById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid admin information link ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = { validateAdminInfo, validateAdminInfoById };

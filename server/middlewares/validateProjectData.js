const validateProjectData = (req, res, next) => {
  const { name, type, description } = req.body;

  // if (!name || !type || !description) {
  //   return res.status(400).json({ message: "Missing required fields" });
  // }

  // Check if name is present, is a string, and has a valid length
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 5 ||
    name.trim().length > 60
  ) {
    return res
      .status(400)
      .json({ message: "Name must be string between 5 to 60 characters" });
  }
  if (
    !type ||
    typeof type !== "string" ||
    type.trim().length < 5 ||
    type.trim().length > 60
  ) {
    return res
      .status(400)
      .json({ message: "Type must be string between 5 to 60 characters" });
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 10 ||
    description.trim().length > 500
  ) {
    return res.status(400).json({
      message: "Description must be string between 10 to 500 characters",
    });
  }
  // Trim whitespace from validated fields
  req.body.name = name.trim();
  req.body.type = type.trim();
  req.body.description = description.trim();

  next();
};

module.exports = validateProjectData;

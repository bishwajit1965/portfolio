const { ObjectId } = require("mongodb");

const validateInspIrationalQuoteData = (req, res, next) => {
  const { popularQuote, author } = req.body;

  // Checks if popularQuote is present, is a string, and has a valid length
  if (
    !popularQuote ||
    typeof popularQuote !== "string" ||
    popularQuote.trim().length < 20 ||
    popularQuote.trim().length > 100
  ) {
    return res.status(400).json({
      message: "Popular quote must be a string between 20 to 100 characters.",
    });
  }

  // Checks if author is present, is a string, and has a valid length
  if (
    !author ||
    typeof author !== "string" ||
    author.trim().length < 5 ||
    author.trim().length > 100
  ) {
    return res.status(400).json({
      message: "Author must be a string between 5s to 100 characters.",
    });
  }

  // Trim whitespace from validated fields
  req.body.popularQuote = popularQuote.trim();
  req.body.author = author.trim();

  next(); //Proceed to the next middleware or controller
};

// Validate popular quote data by ID
const validateInspirationalQuoteById = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Invalid popular quote link ID format" });
  }
  next(); //Proceed to the next middleware or controller
};

module.exports = {
  validateInspIrationalQuoteData,
  validateInspirationalQuoteById,
};

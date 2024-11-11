const validateBlogPost = (req, res, next) => {
  const { title, content, author, imageUrl, category, tag, status } = req.body;
  const errors = [];

  // Validate title
  if (!title || title.trim().length === 0) errors.push("Title is required.");

  // Validate content
  if (!content || content.trim().length === 0)
    errors.push("Content is required.");

  // Validate author
  if (!author || author.trim().length === 0) errors.push("Author is required.");

  // Validate image URL
  if (!imageUrl || imageUrl.trim().length === 0) {
    errors.push("Image URL is required.");
  }

  // Validate category
  if (!category || !Array.isArray(category) || category.length === 0)
    errors.push("At least one category is required.");
  else {
    // Ensure each category is a valid ObjectId (24 hex characters)
    if (!category.every((cat) => /^[0-9a-fA-F]{24}$/.test(cat))) {
      errors.push("Each category must be a valid ObjectId.");
    }
  }

  // Validate tags (if you're using ObjectId for tags, validate similarly to categories)
  if (!tag || !Array.isArray(tag) || tag.length === 0)
    errors.push("At least one tag is required.");
  else {
    // Ensure each tag is a valid ObjectId (24 hex characters)
    if (!tag.every((t) => /^[0-9a-fA-F]{24}$/.test(t))) {
      errors.push("Each tag must be a valid ObjectId.");
    }
  }

  // Validate status
  if (!status || !["draft", "published"].includes(status))
    errors.push("Valid status ('draft' or 'published') is required.");

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ message: "Invalid data provided", errors });
  }

  // Proceed to next middleware if no validation errors
  next();
};

module.exports = validateBlogPost;

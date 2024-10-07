const { ObjectId } = require("mongodb");

const validateTestimonialData = (req, res, next) => {
  const {
    name,
    designation,
    company,
    testimonial,
    date,
    rating,
    photo,
    location,
    projectName,
    email,
    socialLinks,
    isVisible,
    order,
    tags,
  } = req.body;

  // Validate name
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    res.status(400).json({
      message: "Name must be string between 2 to 50 characters.",
    });
  }

  // Validate designation
  if (
    !designation ||
    typeof designation !== "string" ||
    designation.trim().length < 2 ||
    designation.trim().length > 50
  ) {
    res.status(400).json({
      message: "Designation must be string between 2 to 50 characters.",
    });
  }

  // Validate company
  if (
    !company ||
    typeof company !== "string" ||
    company.trim().length < 2 ||
    company.trim().length > 50
  ) {
    res.status(400).json({
      message: "Company must be string between 2 to 50 characters.",
    });
  }

  // Validate testimonial
  if (
    !testimonial ||
    typeof testimonial !== "string" ||
    testimonial.trim().length < 10 ||
    testimonial.trim().length > 1000
  ) {
    res.status(400).json({
      message: "Testimonial must be string between 10 to 1000 characters.",
    });
  }

  // Validate date (basic check, adjust regex or use a library like Moment.js for better validation)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Example: "2024-09-12"
  if (!date || !dateRegex.test(date)) {
    return res.status(400).json({
      message: "Date must be in YYYY-MM-DD format.",
    });
  }
  // Validate rating
  const parsedRating = Number(rating); // Ensure rating is a number

  if (!parsedRating || typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be a number between 1 and 5.",
    });
  }

  // Validate photo URL
  // Define URL regex for validation
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Simple URL validation regex

  if (photo) {
    if (typeof photo !== "string" || !urlRegex.test(photo.trim())) {
      return res.status(400).json({
        message: "Photo URL must be a valid URL.",
      });
    }

    req.body.photo = photo.trim(); // Trim after validation
  }

  // Validate location
  if (
    !location ||
    typeof location !== "string" ||
    location.trim().length < 2 ||
    location.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Location must be a string between 2 to 50 characters.",
    });
  }

  // Validate projectName
  if (
    !projectName ||
    typeof projectName !== "string" ||
    projectName.trim().length < 2 ||
    projectName.trim().length > 50
  ) {
    return res.status(400).json({
      message: "Project Name must be a string between 2 to 50 characters.",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      message: "Email must be a valid email address.",
    });
  }

  // Validate socialLinks (array of URLs)
  if (!socialLinks || !Array.isArray(socialLinks)) {
    return res.status(400).json({
      message: "Social Links must be an array.",
    });
  }

  const isValidSocialLinks = socialLinks.every((link) =>
    urlRegex.test(link.trim())
  );

  if (!isValidSocialLinks) {
    return res.status(400).json({
      message: "Each social link must be a valid URL.",
    });
  }

  // Validate isVisible (boolean)
  if (typeof isVisible !== "boolean") {
    return res.status(400).json({
      message: "isVisible must be a boolean.",
    });
  }

  // Validate order (integer)
  if (
    order === undefined ||
    typeof order !== "number" ||
    !Number.isInteger(order)
  ) {
    return res.status(400).json({
      message: "Order must be an integer.",
    });
  }

  // Validate tags (array of strings)
  if (!tags || !Array.isArray(tags)) {
    return res.status(400).json({
      message: "Tags must be an array.",
    });
  }

  // Validate tags
  const isValidTags = tags.every(
    (tag) =>
      typeof tag === "string" &&
      tag.trim().length >= 2 &&
      tag.trim().length <= 20
  );

  if (!isValidTags) {
    return res.status(400).json({
      message: "Each tag must be a string between 2 to 20 characters.",
    });
  }

  // Trim validated string fields
  req.body.name = name.trim();
  req.body.designation = designation.trim();
  req.body.company = company.trim();
  req.body.testimonial = testimonial.trim();
  req.body.location = location.trim();
  req.body.projectName = projectName.trim();
  req.body.email = email.trim();
  req.body.socialLinks = socialLinks.map((link) => link.trim());
  req.body.tags = tags.map((tag) => tag.trim());

  next(); // Proceed to the next middleware or controller
};

// Validate testimonials data by ID

const validateTestimonialById = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  // Check if the id is a valid ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid testimonial ID format." });
  }

  next(); // Proceed to the next middleware or controller
};

module.exports = { validateTestimonialData, validateTestimonialById };

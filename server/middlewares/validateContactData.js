const validateContactData = (req, res, next) => {
  const { name, email, message } = req.body;

  // Check if name is present, is a string, and has a valid length
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 5 ||
    name.trim().length > 50
  ) {
    return res
      .status(400)
      .json({ message: "Name must be a string between 5 to 50 characters." });
  }

  // Check if email is present, is a string, and matches a basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailPattern.test(email.trim())) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Check if message is present, is a string, and has a valid length
  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.trim().length > 500
  ) {
    return res.status(400).json({
      message: "Message must be a string between 10 and 500 characters.",
    });
  }

  // Trim whitespace from validated fields
  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.message = message.trim();

  next();
};

module.exports = validateContactData;

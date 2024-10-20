const isAuthorized = (requiredRole) => {
  return (req, res, next) => {
    // Ensure that the user is authenticated and the role is attached to the object
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user data found." });
    }
    // Check the users's role matched the required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource.",
      });
    }
    next();
  };
};

module.exports = { isAuthorized };

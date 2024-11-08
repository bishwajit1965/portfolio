// middlewares/isUserAuthorized.js

const isUserAuthorized =
  (...allowedRoles) =>
  (req, res, next) => {
    // Ensure `req.user` exists and has a role property from `authenticatedUser` middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden. You don't have permission." });
    }
    next();
  };

module.exports = isUserAuthorized;

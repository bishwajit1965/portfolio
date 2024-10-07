const verifySuperAdmin = (req, res, next) => {
  const { role } = req.user; //Assuming 'req.use' contains user info from JWT
  if (role !== "super-admin") {
    return res.status(403).json({ message: "Access denied! Super admin only" });
  }
  next();
};

module.exports = verifySuperAdmin;

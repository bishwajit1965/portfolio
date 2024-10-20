const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SuperAdminModel = require("../models/SuperAdminModel"); // New model for super admins

// Super Admin Login
const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdminUser = new SuperAdminModel();
    const superAdmin = await superAdminUser.findUserByEmail(email);
    console.log("Super admin:", superAdmin);

    if (!superAdmin) {
      return res.status(404).json({ message: "Super Admin not found." });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: superAdmin._id, email: superAdmin.email, role: superAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in super admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the current authenticated super admin
const getCurrentSuperAdmin = (req, res) => {
  res.status(200).json({ email: req.user.email, role: req.user.role });
};

module.exports = { superAdminLogin, getCurrentSuperAdmin };

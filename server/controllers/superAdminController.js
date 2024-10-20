const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const superAdminModel = require("../models/SuperAdminModel");

const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userModel = new superAdminModel();
    const user = await userModel.findUserByEmail(email);

    // Check if user exists and passwords match
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    if (validCredentials) {
      const token = generateToken({ id: user._id, role: user.role });
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Generate JWT for super admin
    // const token = jwt.sign(
    //   { id: superAdmin._id, role: superAdmin },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    // res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSuperAdminDashboard = (req, res) => {
  // Assuming you want to send a JSON response with dashboard data
  res.status(200).json({
    message: "Welcome to the Super Admin Dashboard",
    // Add any other data you want to send to the client
  });
};

module.exports = { superAdminLogin, getSuperAdminDashboard };

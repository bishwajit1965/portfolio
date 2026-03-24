const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const superAdminModel = require("../models/SuperAdminModel");
const User = require("../models/User");
const Project = require("../models/projectModel");
const BlogPost = require("../models/blogPostModel");
const Notice = require("../models/noticeModel");

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
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  console.log("🚀 Get dashboard status controller method is hit!!!");
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalBlogs = await BlogPost.countDocuments();
    const totalNotices = await Notice.countDocuments();

    // Optional: Users by role
    const rolesAggregation = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    const usersByRole = {};
    rolesAggregation.forEach((r) => {
      usersByRole[r._id] = r.count;
    });

    res.status(200).json({
      totalUsers,
      totalProjects,
      totalBlogs,
      totalNotices,
      usersByRole,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getSuperAdminDashboard = (req, res) => {
  // Assuming you want to send a JSON response with dashboard data
  res.status(200).json({
    message: "Welcome to the Super Admin Dashboard",
    // Add any other data you want to send to the client
  });
};

module.exports = { superAdminLogin, getSuperAdminDashboard, getDashboardStats };

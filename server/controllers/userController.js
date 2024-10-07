const User = require("../models/User");

// Get all users (only super-admin can access this)
const getAllUsers = async (req, res) => {
  try {
    const userModel = new User();
    const users = await userModel.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Update a user's role (only super-admin can access this)
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    const userModel = new User();
    const updatedUser = await userModel.updateUser(id, role);
    if ((updatedUser, modifiedCount > 0)) {
      res
        .status(200)
        .json({ success: true, message: "Role updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update role" });
  }
};

module.exports = { getAllUsers, updateUserRole };

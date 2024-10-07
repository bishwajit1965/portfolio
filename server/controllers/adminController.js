const User = require("../models/User");

// Get all users (Super Admin Dashboard)
const getAllUsers = async (req, res) => {
  try {
    const userModel = new User();
    const users = await userModel.getAllUsers(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user's role (Super Admin Only)
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body; // New role is passed in request body

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  try {
    const userModel = new User();
    const updated = await userModel.updateUserRole(id, role);

    if (!updated) {
      return res
        .status(404)
        .json({ message: "User not found or role not updated" });
    }

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user (Super Admin Only)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userModel = new User();
    const deleted = await userModel.deleteUser(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};

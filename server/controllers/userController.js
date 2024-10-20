// const { messaging } = require("firebase-admin");
const User = require("../models/User");

// Get all users (only super-admin can access this)
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query params
  try {
    const userModel = new User();
    const users = await userModel.getAllUsersPaginated(page, limit);
    const totalUsers = await userModel.countUsers(); // Get the total number of users for serial calculation
    res.status(200).json({
      success: true,
      data: users,
      currentPage: parseInt(page),
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Update a user's role (only super-admin can access this)
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userModel = new User();
    const updatedUser = await userModel.setRoleForUser(id, role);
    if (updatedUser) {
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userModel = new User();
    const user = await userModel.findUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // (Optional) Conditional approach to prevent deletion of role-based superAdmin
    if (role && user.role === "superAdmin") {
      return response.status(403).json({
        success: false,
        message: "Super Admin: you can not delete a super admin",
      });
    }

    const deleteResult = await userModel.deleteUserById(id);

    if (deleteResult.deletedCount === 1) {
      res.status(200).json({ success: true, message: "User data deleted" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };

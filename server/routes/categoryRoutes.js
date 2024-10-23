const express = require("express");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAuthorized } = require("../middlewares/isAuthorized");

const router = express.Router();

// Create a new category
router.post("/", isAuthenticated, isAuthorized("superAdmin"), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Update category
router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  updateCategory
);
// Delete category
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("superAdmin"),
  deleteCategory
);

module.exports = router;

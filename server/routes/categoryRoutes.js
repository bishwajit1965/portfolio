const express = require("express");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { isAuthenticatd } = require("../middlewares/isAuthenticatd");
const { isAuthorized } = require("../middlewares/isAuthorized");

const router = express.Router();

// Create a new category
router.post("/", isAuthenticatd, isAuthorized("superAdmin"), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Update category
router.patch(
  "/:id",
  isAuthenticatd,
  isAuthorized("superAdmin"),
  updateCategory
);
// Delete category
router.delete(
  "/:id",
  isAuthenticatd,
  isAuthorized("superAdmin"),
  deleteCategory
);

module.exports = router;

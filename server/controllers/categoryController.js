const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { name } = req.body;
  // Step 1: Input validation
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }
  try {
    // Step 2: Check if the category already exists
    const existingCategory = await Category.findCategoryByName(name);

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }
    // Step 3: Create a new category using the model
    const newCategory = await Category.createCategory(name);

    // Step 4: Trigger the onCategoryCreated function (if necessary)
    onCategoryCreated(newCategory);

    // Step 5: Trigger the onCategoryCreated function
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating category", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    console.log("Received ID for update:", id);
    console.log("Updated Data:", updatedData);

    const updatedCategory = await Category.updateCategory(id, updatedData);

    if (updatedCategory.modifiedCount > 0) {
      console.log("Category updated successfully.");
      res.status(200).json({
        message: "Category updated successfully!",
        updatedCategory,
      });
    } else {
      console.log("No category updated, document not found.");
      res.status(400).json({ message: "Category data not found." });
    }
  } catch (error) {
    console.error("Error in updating category:", error);
    res.status(500).json({ message: "Error in updating category.", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.deleteCategory(id);
    if (deletedCategory.deletedCount > 0) {
      res.status(200).json({ message: "Category deleted" });
    } else {
      res.status(400).json({ message: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

// Callback function that runs after a category is created
const onCategoryCreated = (category) => {
  // You can perform any action here (e.g., logging, further updates, etc.)
  console.log(`New Category Created: ${category.name}`);
  // Add any other actions that should be performed when a category is created
  // For example, update related posts, notify admins, etc.
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

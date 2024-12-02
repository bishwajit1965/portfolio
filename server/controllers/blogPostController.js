const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

const {
  createBlogPost,
  getBlogPost,
  getBlogPostsByCriteria,
  updateBlogPost,
  getRelatedPosts,
  deleteBlogPost,
} = require("../models/blogPostModel");

// Add blog post
const addBlogPost = async (req, res) => {
  const blogPostData = req.body;

  if (req.file) {
    blogPostData.imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newPost = await createBlogPost(blogPostData);
    res
      .status(201)
      .json({ message: "Blog post created successfully.", newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get a single blog post
const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const singlePost = await getBlogPost(id);
    res.status(200).json(singlePost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function to fetch only published blog posts for regular users
const getPublishedBlogPosts = async (req, res) => {
  try {
    const blogPosts = await getBlogPostsByCriteria({});
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to fetch all blog posts for admin
const getAllBlogPostsForAdmin = async (req, res) => {
  try {
    const blogPosts = await getBlogPostsByCriteria({}); // No filter, fetch all
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editBlogPost = async (req, res) => {
  try {
    const { id } = req.params; // Extract blog post ID from request params
    let updateData = req.body;

    console.log("req.body:", req.body);
    console.log("req.params:", req.params);

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format." });
    }

    const objectId = new ObjectId(id);

    // Validate existing blog post
    const existingBlogPost = await getBlogPost(objectId); // Ensure ID is valid
    console.log("Existing post:", existingBlogPost);
    if (!existingBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Handle image upload (if new image is provided)
    let imagePath = existingBlogPost.imageUrl; // Default to the existing image URL
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Set new image URL
      const previousImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(existingBlogPost.imageUrl) // Extract filename
      );

      // Delete the old image file if it exists
      try {
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath); // Delete old image synchronously
        }
      } catch (err) {
        console.error("Error deleting old image:", err);
        // Optionally, you could continue and not stop the update process
      }
    }

    // Add the imagePath to updateData
    updateData.imageUrl = imagePath;

    // Update blog post in the database
    const result = await updateBlogPost(id, updateData);

    if (result.modifiedCount === 1 || result.matchedCount === 1) {
      return res.status(200).json({
        message: "Blog post updated successfully.",
        data: { ...existingBlogPost, ...updateData },
      });
    } else {
      return res.status(400).json({ message: "Failed to update blog post" });
    }
  } catch (error) {
    console.error("Error in updating blog post:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating blog post" });
  }
};

// Get category related posts for SingleBlogPosts.jsx
const getCategoryRelatedPosts = async (req, res) => {
  const { categories } = req.query;

  // Validate input
  if (!categories) {
    return res
      .status(400)
      .json({ message: "Categories are required for filtering." });
  }

  try {
    // Split categories into an array
    const categoryIds = categories.split(",").map((id) => id.trim());

    // Fetch posts matching any of the categories
    const relatedPosts = await getRelatedPosts(categoryIds);

    if (!relatedPosts || relatedPosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for the given categories." });
    }

    res.status(200).json(relatedPosts);
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    res.status(500).json({ message: "Error fetching related posts." });
  }
};

// Delete blog post
const removeBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await deleteBlogPost(id);

    if (deletedCount > 0) {
      res.status(200).json({ message: "Blog post deleted successfully." });
    } else {
      res.status(404).json({ message: "Blog post not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error in deleting blog post.",
      error: error.message,
    });
  }
};

module.exports = {
  addBlogPost,
  getSinglePost,
  getPublishedBlogPosts,
  getAllBlogPostsForAdmin,
  editBlogPost,
  getCategoryRelatedPosts,
  removeBlogPost,
};

const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

const {
  createBlogPost,
  getBlogPost,
  randomPosts,
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

const getRandomBlogPosts = async (req, res) => {
  try {
    const latestPosts = await randomPosts();
    const randomizedPosts = latestPosts.sort(() => 0.5 - Math.random());
    const limitedPosts = randomizedPosts.slice(0, 8);
    res.status(200).json({ posts: limitedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const editBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format." });
    }

    const objectId = new ObjectId(id);

    // Validate existing blog post
    const existingBlogPost = await getBlogPost(objectId);

    if (!existingBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Handle image upload (if a new image is provided)
    let imagePath = existingBlogPost.imageUrl; // Default to existing image

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Update with new image

      // Delete the old image if it exists
      const previousImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(existingBlogPost.imageUrl)
      );

      try {
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
        }
      } catch (err) {
        console.error("Error deleting old image:", err);
      }
    }

    // Only set `imageUrl` if a new image is uploaded
    if (req.file) {
      updateData.imageUrl = imagePath;
    } else {
      delete updateData.imageUrl; // Remove the field to avoid overwriting with undefined
    }

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
  const { category } = req.query;

  // Validate the `category` parameter
  if (!category) {
    console.error("Category parameter is missing.");
    return res
      .status(400)
      .json({ message: "Category is required for filtering." });
  }

  // Parse category IDs into an array of strings
  const categoryIds = category.split(",").map((id) => id.trim());

  try {
    // Fetch related posts
    const relatedPosts = await getRelatedPosts(categoryIds);

    if (relatedPosts.length === 0) {
      return res.status(404).json({ message: "No related posts found." });
    }

    return res.status(200).json(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching related posts." });
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
  getRandomBlogPosts,
  editBlogPost,
  getCategoryRelatedPosts,
  removeBlogPost,
};

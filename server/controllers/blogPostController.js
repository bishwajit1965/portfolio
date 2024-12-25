const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

const {
  createBlogPost,
  getBlogPost,
  randomPosts,
  getPublishedBlogPosts,
  getBlogPostsForAdmin,
  updateBlogPost,
  getRelatedPosts,
  addBookmarkToUser,
  removeBookmark,
  fetchBookmarkedPosts,
  deleteBlogPost,
  comingSoon,
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

// Fetch all blog posts for admin
const getAllBlogPostsForAdmin = async (req, res) => {
  try {
    const adminBlogPosts = await getBlogPostsForAdmin(); // No filter, fetch all
    res.status(200).json(adminBlogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch only published blog posts for regular users
const getOnlyPublishedBlogPosts = async (req, res) => {
  try {
    const publishedBlogPosts = await getPublishedBlogPosts();
    res.status(200).json(publishedBlogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update blog posts
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

// Fetch random latest post for home page
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

// Blog post coming soon
const blogPostComingSoon = async (req, res) => {
  try {
    const result = await comingSoon();
    return res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error in fetching coming soon blog post." });
  }
};

// Add bookmark
const addBookmarkToPost = async (req, res) => {
  const { userId, postId } = req.body;
  console.log("Incoming request body:", req.body); // Log incoming data

  try {
    const result = await addBookmarkToUser(userId, postId);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Bookmark added successfully.", result });
    } else {
      res.status(400).json({ message: "Failed to add bookmark." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error in adding bookmark." });
  }
};

// Remove bookmark
const removeBookmarkFromPost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;

  try {
    const result = await removeBookmark(userId, postId);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Bookmark removed successfully." });
    } else {
      res.status(400).json({ message: "Failed to remove bookmark." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error in removing bookmark." });
  }
};

// Fetch bookmarked posts
const fetchBookmarkedPostsForUser = async (req, res) => {
  const userId = req.user.id;
  console.log("User ID in fetchBookmarkedPostsForUser:", userId);

  try {
    const bookmarkedPosts = await fetchBookmarkedPosts(userId);
    if (bookmarkedPosts.length === 0) {
      return res.status(404).json({ message: "No bookmarked posts found." });
    }
    res.status(200).json(bookmarkedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error in fetching bookmarks." });
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
  getOnlyPublishedBlogPosts,
  getAllBlogPostsForAdmin,
  getRandomBlogPosts,
  editBlogPost,
  getCategoryRelatedPosts,
  blogPostComingSoon,
  addBookmarkToPost,
  removeBookmarkFromPost,
  fetchBookmarkedPostsForUser,
  removeBlogPost,
};

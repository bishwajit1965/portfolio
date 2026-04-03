const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

// Constants for Cloudinary paths
const blogPath = process.env.PORTFOLIO_BLOG_PATH || "portfolio_blog";

// Utility functions for image handling
const { uploadImage, deleteImage } = require("../utils/upload.service");

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

  try {
    if (req.file) {
      const uploaded = await uploadImage(req.file, blogPath);

      blogPostData.imageUrl = uploaded.url;
      blogPostData.publicId = uploaded.public_id;
    }
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

    const existingPost = await getBlogPost(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    let updateData = { ...req.body };

    // ✅ If new image is uploaded
    if (req.file) {
      // 1. Delete old image from Cloudinary
      if (existingPost.publicId) {
        await deleteImage(existingPost.publicId);
      }

      // 2. Upload new image (buffer-based)
      const uploaded = await uploadImage(req.file, blogPath);

      // 3. Update fields
      updateData.imageUrl = uploaded.url;
      updateData.publicId = uploaded.public_id;
    }

    // 4. Update DB
    const result = await updateBlogPost(id, updateData);

    return res.status(200).json({
      message: "Blog post updated successfully",
      result,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "Error updating blog post",
      error: error.message,
    });
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
    console.error("Coming soon controller error:", error);
    res
      .status(500)
      .json({ message: "Server error in fetching coming soon blog post." });
  }
};

// Add bookmark
const addBookmarkToPost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const result = await addBookmarkToUser(userId, postId);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Bookmark added successfully.", result });
    } else {
      res.status(400).json({
        message: "This post is already in your bookmarks.",
        alreadyBookmarked: true,
        result,
      });
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
    // Fetch the blog post first to get the image public_id
    const blog = await getBlogPost(id);
    if (!blog) return res.status(404).json({ message: "Blog post not found." });

    // Delete image from Cloudinary if exists
    if (blog.imageUrl && blog.public_id) {
      await deleteImage(blog.public_id);
    }

    // Delete the blog post from DB
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

const fs = require("fs");
const path = require("path");

const { ObjectId } = require("mongodb");
const {
  createBlogPost,
  getBlogPost,
  getAllBlogPosts,
  updateBlogPost,
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

// Fetch all blog Posts
const fetchBlogPosts = async (req, res) => {
  try {
    const posts = await getAllBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching blog posts", error: error.message });
  }
};

// Edit blog post
const editBloPost = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const newImage = req.file; //Assuming image is uploaded with multer
  try {
    const postId = new ObjectId(id);
    console.log("Post ID:", postId);
    console.log("Updated Data:", updatedData);
    console.log("New Image:", newImage);
    const updatedPost = await updateBlogPost(postId, updatedData, newImage);
    if (newImage && updatedPost.imageUrl !== newImage.filename) {
      // Remove the old image from the uploads if new image is provided
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        updatedPost.imageUrl
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image.", err);
          }
        });
      }
    }
    if (updatedPost) {
      res.status(200).json({ message: "Blog Post updated successfully." });
    } else {
      res.status(404).json({ message: "Blog post not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating blog post.", error: error.message });
  }
};

// Delete blog post
const removeBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteBlogPost(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Blog post deleted successfully." });
    } else {
      res.status(404).json({ message: "Blog post not found," });
    }
  } catch (error) {
    res.status(500).json({
      message: " Server error in deleting blog post",
      error: error.message,
    });
  }
};

module.exports = {
  addBlogPost,
  getSinglePost,
  fetchBlogPosts,
  editBloPost,
  removeBlogPost,
};

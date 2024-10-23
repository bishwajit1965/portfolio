const { ObjectId } = require("mongodb");
const {
  createBlogPost,
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
const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await updateBlogPost({ id: new ObjectId(id), updatedData });
    if (result.modifiedCount > 0) {
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
    const result = await deleteBlogPost({ _id: new ObjectId(id) });
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

module.exports = { addBlogPost, fetchBlogPosts, editBlogPost, removeBlogPost };

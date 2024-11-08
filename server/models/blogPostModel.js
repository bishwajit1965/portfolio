const { getDB } = require("../utils/database");

const { ObjectId } = require("mongodb");

// Create blog posts
const createBlogPost = async (blogPostData) => {
  try {
    const db = getDB();
    const { title, content, author, imageUrl, category, tag, status } =
      blogPostData;
    const parsedCategories =
      typeof category === "string" ? JSON.parse(category) : category;
    const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag;

    const newPost = {
      title,
      content,
      author,
      imageUrl,
      category: parsedCategories,
      tag: parsedTags,
      status: status || "draft", // Default status
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("blogPosts").insertOne(newPost);
    return await db.collection("blogPosts").findOne({ _id: result.insertedId });
    //Return the created post ID
  } catch (error) {
    throw new Error("Error in creating blog post" + error.message);
  }
};

// Get single blog post
const getBlogPost = async (id) => {
  try {
    const db = getDB();
    const post = await db
      .collection("blogPosts")
      .findOne({ _id: new ObjectId(id) });
    return post;
  } catch (error) {
    throw new Error("No post found:" + error.message);
  }
};

// Get all blog posts
const getAllBlogPosts = async () => {
  try {
    const db = getDB();
    const posts = await db.collection("blogPosts").find({}).toArray();
    return posts;
  } catch (error) {
    throw new Error("No posts found:" + error.message);
  }
};

// Update blog post
const updateBlogPost = async (id, updatedData) => {
  try {
    const db = getDB();
    const result = await db
      .collection("blogPosts")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updatedData, updatedAt: new Date() } }
      );
    if (result.matchedCount === 0) {
      throw new Error("Blog post not found.");
    }
    return result;
  } catch (error) {
    throw new Error("Error in updating blog post:" + error.message);
  }
};

// Delete blog post
const deleteBlogPost = async (id) => {
  try {
    const db = getDB();
    const result = await db
      .collection("blogPosts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      throw new Error("Blog post not deleted.");
    }
    return result;
  } catch (error) {
    throw new Error("Blog post is not deleted:" + error.message);
  }
};

module.exports = {
  createBlogPost,
  getBlogPost,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
};

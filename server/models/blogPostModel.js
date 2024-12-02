const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

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

// Function to get blog posts based on filter criteria
const getBlogPostsByCriteria = async () => {
  try {
    const db = getDB();
    const blogPosts = await db.collection("blogPosts").find().toArray();
    return blogPosts;
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

// Update a blog post
const updateBlogPost = async (id, updateData) => {
  const db = getDB();

  // Convert ID to ObjectId
  const objectId = new ObjectId(id);

  // Retrieve current blog post to get existing image info
  const existingBlogPost = await db
    .collection("blogPosts")
    .findOne({ _id: objectId });

  if (!existingBlogPost) {
    throw new Error("Blog post not found.");
  }

  // Destructure updateData to get the new image and other fields to update
  const { _id, imageUrl: newImage, ...updateFields } = updateData;

  // Handle image replacement logic
  if (newImage && existingBlogPost.imageUrl) {
    const oldImagePath = path.join(
      __dirname,
      "../uploads",
      path.basename(existingBlogPost.imageUrl) // Only use the filename to remove it
    );

    // Check if the old image file exists and delete it if present
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // Remove the old image file
    }
  }

  // Update the blog post, either with the new image or retain the old one if no new image is provided
  const result = await db.collection("blogPosts").updateOne(
    { _id: objectId },
    {
      $set: {
        ...updateFields, // Updates the other fields (title, content, etc.)
        imageUrl: newImage || existingBlogPost.imageUrl, // Use the new image or retain the old one if not provided
      },
    }
  );

  return result; // Return the result of the update operation
};

// Get related blog post
const getRelatedPosts = async (categoryIds) => {
  console.log("Category IDs received for querying:", categoryIds);
  const db = getDB();
  const postsCollection = db.collection("blogPosts");
  try {
    const relatedPosts = await postsCollection
      .find({ category: { $in: categoryIds } })
      .limit(5)
      .toArray();
    return relatedPosts;
  } catch (error) {
    console.error("Error in fetching blog posts,", error);
    return [];
  }
};

// Delete blog post
const deleteBlogPost = async (id) => {
  const objectId = new ObjectId(id);
  try {
    const db = getDB();
    const postCollection = db.collection("blogPosts");
    // Find the the post to delete to get the old image path
    const postToDelete = await postCollection.findOne({
      _id: objectId,
    });
    if (!postToDelete) {
      throw new Error("Post not found.");
    }
    // Delete the post from database
    const result = await postCollection.deleteOne({
      _id: objectId,
    });
    if (result.deletedCount === 0) {
      throw new Error("Blog post not deleted.");
    }
  } catch (error) {
    throw new Error("Blog post is not deleted:" + error.message);
  }
};

module.exports = {
  createBlogPost,
  getBlogPost,
  getBlogPostsByCriteria,
  updateBlogPost,
  getRelatedPosts,
  deleteBlogPost,
};

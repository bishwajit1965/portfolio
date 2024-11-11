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
const updateBlogPost = async (postId, updatedData, newImage) => {
  try {
    const db = getDB();
    const postsCollection = db.collection("blogPosts");

    // Log the incoming postId and updatedData
    console.log("Post ID to Update:", postId);
    console.log("Updated Data:", updatedData);

    // Find the existing post to get the already uploaded image path
    const existingPost = await postsCollection.findOne({
      _id: new ObjectId(postId),
    });

    console.log("Existing Post:", existingPost);

    if (!existingPost) {
      throw new Error("Post not found.");
    }

    // Set the new image Url if provided
    let imageUrl = existingPost.imageUrl;

    if (newImage) {
      // Update the image url with the new image
      imageUrl = newImage.filename;
      console.log("New Image URL:", imageUrl);
    }
    // Remove '_id' from the updatedData to avoid modifying the immutable field
    const { _id, ...dataWithoutId } = updatedData;

    // Update the post with new fields
    const updatedPost = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          ...dataWithoutId,
          imageUrl, // Update only if a new image was uploaded
          updatedAt: new Date(),
        },
      }
    );
    console.log("Update Result:", updatedPost);

    if (updatedPost.modifiedCount === 0) {
      throw new Error("Blog post is not updated.");
    }

    // Fetch the updated post
    const updateResult = await postsCollection.findOne({
      _id: new ObjectId(postId),
    });
    return updateResult;
  } catch (error) {
    throw new Error("Error in updating blog post:" + error.message);
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
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
};

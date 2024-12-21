const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Helper function to generate a slug from a title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
};

// Ensure unique index on the slug field
const ensureUniqueSlugIndex = async () => {
  try {
    const db = getDB();
    await db.collection("blogPosts").createIndex({ slug: 1 }, { unique: true });
    console.log("Unique index on 'slug' field created successfully.");
  } catch (error) {
    console.error("Error creating unique index on 'slug':", error.message);
  }
};

// Create blog posts
const createBlogPost = async (blogPostData) => {
  try {
    const db = getDB();
    const {
      title,
      summary,
      content,
      author,
      imageUrl,
      category,
      tag,
      status,
      willPublishAt,
    } = blogPostData;

    let slug = generateSlug(title);

    // Ensure unique slug by adding a number suffix if needed
    while (await db.collection("blogPosts").findOne({ slug })) {
      slug = `${slug}-${Date.now()}`;
    }

    const parsedCategories =
      typeof category === "string" ? JSON.parse(category) : category;

    const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag;

    const newPost = {
      title,
      slug,
      summary,
      content,
      author,
      imageUrl,
      category: parsedCategories,
      tag: parsedTags,
      status: status || "draft", // Default status
      willPublishAt: willPublishAt
        ? new Date(willPublishAt).toISOString()
        : null, // Scheduling,
      isPublished: false, // Default as unpublished
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

// Fetch random category-wise latest posts
const randomPosts = async () => {
  try {
    const db = getDB();
    const postsCollection = db.collection("blogPosts");
    const posts = await postsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    return posts;
  } catch (error) {
    throw new Error("Database query failed" + error.message);
  }
};

// Fetches all blog posts for super-admin dashboard
const getBlogPostsForAdmin = async () => {
  try {
    const db = getDB();
    console.log("Blog post for admin is hit:");
    const adminBlogPosts = await db
      .collection("blogPosts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    console.log("Response for admin blog posts:", adminBlogPosts);
    return adminBlogPosts;
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

// Fetches published blog posts only
const getPublishedBlogPosts = async () => {
  try {
    const db = getDB();
    console.log("Blog post for users is hit:");
    const publishedBlogPosts = await db
      .collection("blogPosts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    console.log("Response for users blog posts:", publishedBlogPosts);

    return publishedBlogPosts;
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

// Update a blog post
const updateBlogPost = async (id, updateData) => {
  const db = getDB();

  // Convert ID to ObjectId
  const objectId = new ObjectId(id);

  // Retrieve the current blog post to get existing image info
  const existingBlogPost = await db
    .collection("blogPosts")
    .findOne({ _id: objectId });

  if (!existingBlogPost) {
    throw new Error("Blog post not found.");
  }

  const { imageUrl: newImage, _id, ...updateFields } = updateData;

  // Handle image replacement logic
  if (newImage && existingBlogPost.imageUrl) {
    const oldImagePath = path.join(
      __dirname,
      "../uploads",
      path.basename(existingBlogPost.imageUrl)
    );

    // Delete the old image if it exists
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  // Ensure imageUrl is updated only when a new image is provided
  const updatePayload = {
    ...updateFields,
    ...(newImage ? { imageUrl: newImage } : {}),
  };
  console.log("Updated payload:", updatePayload);

  const result = await db
    .collection("blogPosts")
    .updateOne({ _id: objectId }, { $set: updatePayload });

  return result;
};

// Get category related blog post
const getRelatedPosts = async (categoryIds) => {
  console.log("Received category IDs:", categoryIds);

  const db = getDB();
  const postsCollection = db.collection("blogPosts");

  try {
    // MongoDB query with string IDs
    const relatedPosts = await postsCollection
      .find({ category: { $in: categoryIds } })
      .limit(8) // Using string IDs directly
      .toArray();

    console.log("Found related posts:", relatedPosts);
    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw new Error("Error fetching related posts");
  }
};

// Blog post coming soon
const comingSoon = async (req, res) => {
  try {
    const db = getDB();
    const blogsCollection = db.collection("blogPosts");
    const result = await blogsCollection
      .find({
        status: "draft",
        willPublishAt: { $exists: true, $gt: new Date() },
        project: { title: 1, willPublishAt: 1, imageUrl: 1 },
      })
      .limit(5)
      .sort({ createdAt: -1 })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error in fetching coming-soon blog posts", error);
    res
      .status(500)
      .json({ message: "Server error in fetching coming soon post." });
  }
};

// Delete blog post
const deleteBlogPost = async (id) => {
  const objectId = new ObjectId(id);
  try {
    const db = getDB();
    const postCollection = db.collection("blogPosts");

    // Find the post to delete to get the old image path
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

    // Return deletedCount to indicate success
    return result.deletedCount;
  } catch (error) {
    throw new Error("Blog post is not deleted: " + error.message);
  }
};

module.exports = {
  createBlogPost,
  ensureUniqueSlugIndex,
  getBlogPost,
  randomPosts,
  getPublishedBlogPosts,
  getBlogPostsForAdmin,
  updateBlogPost,
  getRelatedPosts,
  comingSoon,
  deleteBlogPost,
};

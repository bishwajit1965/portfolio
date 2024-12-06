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
  console.log("=== START: getCategoryRelatedPosts ===");

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
  console.log("Parsed category IDs:", categoryIds);

  try {
    // Fetch related posts
    const relatedPosts = await getRelatedPosts(categoryIds);

    if (relatedPosts.length === 0) {
      console.log("No related posts found for the given category IDs.");
      return res.status(404).json({ message: "No related posts found." });
    }

    console.log("Fetched related posts:", relatedPosts);
    return res.status(200).json(relatedPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching related posts." });
  }
};

// const getCategoryRelatedPosts = async (req, res) => {
//   try {
//     console.log("=== START: getCategoryRelatedPosts ===");

//     console.log("Received query parameters:", req.query);

//     const { category } = req.query;
//     if (!category) {
//       console.error("Category query parameter is missing.");
//       return res.status(400).json({ message: "Category is required." });
//     }

//     const categoryIds = category.split(",").map((id) => id.trim());
//     console.log("Parsed category IDs:", categoryIds);

//     const invalidIds = categoryIds.filter((id) => !ObjectId.isValid(id));
//     if (invalidIds.length > 0) {
//       console.error("Invalid ObjectId(s):", invalidIds);
//       return res
//         .status(400)
//         .json({ message: `Invalid ObjectId(s): ${invalidIds.join(", ")}` });
//     }

//     console.log("All IDs are valid. Proceeding with query...");

//     const relatedPosts = await getRelatedPosts(categoryIds);
//     console.log("Fetched related posts:", relatedPosts);

//     if (!relatedPosts || relatedPosts.length === 0) {
//       console.warn("No related posts found for the given category IDs.");
//       return res.status(404).json({ message: "No related posts found." });
//     }

//     console.log("Returning related posts...");
//     return res.status(200).json(relatedPosts);
//   } catch (error) {
//     console.error("Error in getCategoryRelatedPosts:", error);
//     return res.status(500).json({ message: "Server error occurred." });
//   } finally {
//     console.log("=== END: getCategoryRelatedPosts ===");
//   }
// };

// const getCategoryRelatedPosts = async (req, res) => {
//   // Logging for debugging
//   console.log("Received query parameters:", req.query);
//   console.log("Query parameter category:", req.query.category);

//   const { category } = req.query; // Extract category from the query string

//   // Validate the category parameter
//   if (!category) {
//     return res
//       .status(400)
//       .json({ message: "Category is required for filtering." });
//   }

//   // Split the category into an array and trim any spaces
//   const categoryIds = category.split(",").map((id) => id.trim());
//   console.log("Parsed category IDs:", categoryIds);

//   try {
//     // Fetch related posts using the category IDs
//     const relatedPosts = await getRelatedPosts(categoryIds);

//     if (relatedPosts.length === 0) {
//       return res.status(404).json({ message: "No related posts found." });
//     }

//     res.status(200).json(relatedPosts);
//   } catch (error) {
//     console.error("Error fetching filtered posts:", error);
//     res
//       .status(500)
//       .json({ message: "Server error while fetching related posts." });
//   }
// };

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

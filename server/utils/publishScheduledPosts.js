const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

const publishScheduledPosts = async () => {
  try {
    const db = getDB();
    const now = new Date();

    // Find posts that should be published
    const postsToPublish = await db
      .collection("blogPosts")
      .find({ willPublishAt: { $lte: now }, isPublished: false })
      .toArray();

    for (const post of postsToPublish) {
      await db
        .collection("blogPosts")
        .updateOne(
          { _id: ObjectId(post._id) },
          { $set: { isPublished: true, status: "published", publishedAt: now } }
        );
    }

    if (postsToPublish.length > 0) {
      console.log(`${postsToPublish.length} posts published.`);
    } else {
      console.log("No posts to publish.");
    }
  } catch (error) {
    console.error("Error in publishing scheduled posts: ", error.message);
  }
};

module.exports = { publishScheduledPosts };

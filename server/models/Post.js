const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

class Post {
  constructor() {
    this.db = getDB(); // Get the connected database instance
    this.collection = this.db.collection("blogPosts");
  }

  async getPublishedPosts(limit = 9) {
    const posts = await this.collection
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    return posts;
  }
}

module.exports = Post;

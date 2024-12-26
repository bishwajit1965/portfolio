const { create } = require("xmlbuilder2");
const Post = require("../models/Post");

const generatedRssFeed = async (req, res) => {
  try {
    const postsModel = new Post();
    const posts = await postsModel.getPublishedPosts(10);
    console.log("posts", posts.length);
    const feed = create({
      version: "1.0",
      encoding: "UTF-8",
    })
      .ele("rss", { version: "2.0" })
      .ele("channel")
      .ele("title")
      .txt("My Blog")
      .up()
      .ele("link")
      .txt("https://myblog.com")
      .up()
      .ele("description")
      .txt("My personal blog")
      .up()
      .ele("language")
      .txt("en")
      .up();

    posts.forEach((post) => {
      feed
        .ele("item")
        .ele("title")
        .txt(post.title)
        .up()
        .ele("link")
        .txt(`${post._id}`)
        .up()
        .ele("description")
        .txt(post.content)
        .up()
        .ele("pubDate")
        .txt(post.createdAt.toUTCString())
        .up();
    });

    console.log("posts", posts);

    res.set("Content-Type", "text/xml");
    res.send(feed.end({ prettyPrint: true }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { generatedRssFeed };

const express = require("express");
const { generatedRssFeed } = require("../controllers/rssController");
const router = express.Router();

router.get("/", generatedRssFeed); // Generate RSS feed

module.exports = router;

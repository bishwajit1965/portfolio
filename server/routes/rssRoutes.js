const express = require("express");
const { generatedRssFeed } = require("../controllers/rssController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", generatedRssFeed); // Generate RSS feed

module.exports = router;

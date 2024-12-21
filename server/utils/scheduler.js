const cron = require("node-cron");
const { publishScheduledPosts } = require("./scheduler");

// Schedule the publishing job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking for posts to publish...");
  await publishScheduledPosts();
});

module.exports = { startScheduler: () => {} }; // If needed, for manual integration

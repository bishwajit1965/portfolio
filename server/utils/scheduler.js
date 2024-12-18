const cron = require("node-cron");
const { publishScheduledPosts } = require("./scheduler");

// Schedule the publishing job to run every minute
cron.schedule("* * * * *", async () => {
  await publishScheduledPosts();
});

module.exports = { startScheduler: () => {} }; // If needed, for manual integration

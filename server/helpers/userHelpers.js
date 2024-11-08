// Inside helpers/userHelpers.js
const { getDB } = require("../utils/database");

// Function to get user by uid
const getUserByUid = async (uid) => {
  const db = getDB();
  return await db.collection("users").findOne({ uid });
};

module.exports = { getUserByUid };

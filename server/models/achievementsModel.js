const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addAchievement = async (achievementData) => {
  const db = getDB();
  const achievement = await db
    .collection("achievements")
    .insertOne(achievementData);
  return achievement;
};

const getAchievement = async (id) => {
  const db = getDB();
  const achievement = await db
    .collection("achievements")
    .findOne({ _id: new ObjectId(id) });
  return achievement;
};

const getAllAchievements = async () => {
  const db = getDB();
  const achievements = db.collection("achievements").find().toArray();
  return achievements;
};

const updateAchievement = async (id, updateAchievement) => {
  const db = getDB();
  // Create a new ObjectId instance from the provided id
  const objectId = new ObjectId(id);
  // Remove the _id from updateData if it exists
  const { _id, ...updateFields } = updateAchievement;
  const result = await db
    .collection("achievements")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteAchievement = async (id) => {
  const db = getDB();
  const result = await db
    .collection("achievements")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  addAchievement,
  getAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
};

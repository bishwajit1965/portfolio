const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const journeyMilestones = {
  create: async (milestonesData) => {
    const db = getDB();
    return await db.collection("journey-milestones").insertOne(milestonesData);
  },

  getById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db.collection("journey-milestones").findOne({ _id: objectId });
  },

  getJourneyMilestones: async () => {
    const db = getDB();
    return await db.collection("journey-milestones").find().toArray();
  },

  updateById: async (id, milestoneData) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db
      .collection("journey-milestones")
      .updateOne({ _id: objectId }, { $set: milestoneData });
  },

  deleteById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return db.collection("journey-milestones").deleteOne({ _id: objectId });
  },
};

module.exports = journeyMilestones;

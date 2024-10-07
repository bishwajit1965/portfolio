const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const hobby = {
  create: async (hobbyData) => {
    const db = getDB();
    return await db.collection("hobby").insertOne(hobbyData);
  },

  getById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db.collection("hobby").findOne({ _id: objectId });
  },

  getHobbies: async () => {
    const db = getDB();
    return await db.collection("hobby").find().toArray();
  },

  updateById: async (id, hobbyData) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db
      .collection("hobby")
      .updateOne({ _id: objectId }, { $set: hobbyData });
  },

  deleteById: async (id) => {
    const db = getDB();
    const objectId = new ObjectId(id);
    return await db.collection("hobby").deleteOne({ _id: objectId });
  },
};

module.exports = hobby;

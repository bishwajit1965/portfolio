const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addCopyright = async (copyrightMessage) => {
  const db = getDB();
  const copyrightData = await db
    .collection("copyright")
    .insertOne(copyrightMessage);
  return copyrightData;
};

const getById = async (id) => {
  const objectId = new ObjectId(id);
  const db = getDB();
  const copyrightData = await db
    .collection("copyright")
    .findOne({ _id: objectId });
  return copyrightData;
};

const getCopyrightData = async (req, res) => {
  const db = getDB();
  const copyrightData = await db.collection("copyright").find().toArray();
  return copyrightData;
};

const updateById = async (id, updateCopyrightData) => {
  const db = getDB();
  // Create a new object instance from the provided id
  const objectId = new ObjectId(id);

  // Remove the _id from updateCopyrightData if it exists
  const { _id, ...updateFields } = updateCopyrightData;
  const result = await db
    .collection("copyright")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteById = async (id) => {
  const db = getDB();
  const objectId = new ObjectId(id);
  const result = db.collection("copyright").deleteOne({ _id: objectId });
  return result;
};

module.exports = {
  addCopyright,
  getById,
  getCopyrightData,
  updateById,
  deleteById,
};

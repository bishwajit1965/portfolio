const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addBriefIntro = async (briefIntroData) => {
  const db = getDB();
  const intro = db.collection("brief-intro").insertOne(briefIntroData);
  return intro;
};

const getIntro = async (id) => {
  const db = getDB();
  const intro = await db
    .collection("brief-intro")
    .findOne({ _id: new ObjectId(id) });
  return intro;
};

const getIntros = async () => {
  const db = getDB();
  const intros = await db.collection("brief-intro").find().toArray();
  return intros;
};

const updateIntro = async (id, updateIntroData) => {
  const db = getDB();
  // Create a new ObjectId instance from the provided id
  const objectId = new ObjectId(id);
  // Remove the _id from updateIntroData if it exists
  const { _id, ...updateFields } = updateIntroData;
  const result = await db
    .collection("brief-intro")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteIntro = async (id) => {
  const db = getDB();
  const result = await db
    .collection("brief-intro")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  addBriefIntro,
  getIntro,
  getIntros,
  updateIntro,
  deleteIntro,
};

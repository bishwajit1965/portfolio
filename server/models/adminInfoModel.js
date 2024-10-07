const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addAdminInfo = async (adminInfo) => {
  const db = getDB();
  const admin = await db.collection("admin-info").insertOne(adminInfo);
  return admin;
};

const getAdminInfo = async (id) => {
  const db = getDB();
  const admin = await db
    .collection("admin-info")
    .findOne({ _id: new ObjectId(id) });
  return admin;
};

const getAllAdminInfo = async () => {
  const db = getDB();
  const admin = await db.collection("admin-info").find().toArray();
  return admin;
};

const updateAdminInfo = async (id, updateAdmin) => {
  const db = getDB();
  // Create a new ObjectId from the provided id
  const objectId = new ObjectId(id);
  // Remove the _id from the updateAdmin to avoid conflict if it exists
  const { _id, ...updateField } = updateAdmin;
  const result = db
    .collection("admin-info")
    .updateOne({ _id: objectId }, { $set: updateField });
  return result;
};

const deleteAdminInfo = async (id) => {
  const db = getDB();
  const objectId = new ObjectId(id);
  const result = db.collection("admin-info").deleteOne({ _id: objectId });
  return result;
};

module.exports = {
  addAdminInfo,
  getAdminInfo,
  getAllAdminInfo,
  updateAdminInfo,
  deleteAdminInfo,
};

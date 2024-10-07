const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addMessage = async (messageData) => {
  const db = getDB();
  const message = await db.collection("contacts").insertOne(messageData);
  return message;
};

const getContactById = async (id) => {
  const db = getDB();
  const contact = await db
    .collection("contacts")
    .findOne({ _id: new ObjectId(id) });
  return contact;
};

const getAllContacts = async () => {
  const db = getDB();
  const contactMessages = db.collection("contacts").find().toArray();
  return contactMessages;
};

const updateContact = async (id, updateContact) => {
  const db = getDB();
  // Create a new ObjectId instance from the provided id
  const objectId = new ObjectId(id);
  // Remove the _id from updateData if it exists
  const { _id, ...updateFields } = updateContact;
  const result = await db
    .collection("contacts")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteContact = async (id) => {
  const db = getDB();
  const result = await db
    .collection("contacts")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  addMessage,
  getContactById,
  getAllContacts,
  updateContact,
  deleteContact,
};

const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");

async function createNotice(notice) {
  try {
    const db = getDB();
    const noticeCollection = db.collection("notice");
    const result = await noticeCollection.insertOne(notice);
    return result;
  } catch (error) {
    throw new Error("Error in creating notice.", error);
  }
}

async function getAllNotices() {
  try {
    const db = getDB();
    const noticeCollection = db.collection("notice");
    const result = await noticeCollection.find().toArray();
    return result;
  } catch (error) {
    throw new Error("Error in fetching notice.", error);
  }
}

async function getNoticeById(id) {
  try {
    const db = getDB();
    const noticeCollection = db.collection("notice");
    const notice = await noticeCollection.findOne({ _id: new ObjectId(id) });
    return notice;
  } catch (error) {
    throw new Error("Error in fetching notice by Id.", error);
  }
}

async function updateNotice(id, updatedNotice) {
  try {
    const db = getDB();
    const noticeCollection = db.collection("notice");
    const result = await noticeCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedNotice }
    );
    return result;
  } catch (error) {
    throw new Error(`Error in updating notice., ${error.message}`);
  }
}

async function deleteNotice(id) {
  try {
    const db = getDB();
    const noticeCollection = db.collection("notice");
    const result = await noticeCollection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error("Error in deleting notice.", error);
  }
}

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};

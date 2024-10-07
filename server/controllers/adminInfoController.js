const {
  addAdminInfo,
  getAdminInfo,
  getAllAdminInfo,
  updateAdminInfo,
  deleteAdminInfo,
} = require("../models/adminInfoModel");

const createAdminInfo = async (req, res) => {
  try {
    const adminInfoData = req.body;
    const savedAdmin = await addAdminInfo(adminInfoData);
    res.status(201).json({
      message: "Admin information saved successfully!",
      message: savedAdmin,
    });
  } catch (error) {}
};

const getAdminInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchedAdmin = await getAdminInfo(id);
    if (fetchedAdmin) {
      res.status(200).json(fetchedAdmin);
    } else {
      res.status(404).json({ message: "Admin info not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve admin information." });
  }
};

const getAllAdminInfos = async (req, res) => {
  try {
    const fetchAdminInfos = await getAllAdminInfo();
    res.status(200).json(fetchAdminInfos);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve admin information",
    });
  }
};

const updateAdminInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminData = req.body;
    const result = await updateAdminInfo(id, adminData);
    if (result.matchedCount > 0) {
      res.status(200).json({
        message: "Admin information updated successfully!",
      });
    } else {
      res.status(404).json({ message: "Admin information is not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update admin information.", error });
  }
};

const deleteAdminInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminInfo(id);
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Admin information deleted successfully!" });
    } else {
      res.status(404).json({ message: "Admin information is not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin information!" });
  }
};

module.exports = {
  createAdminInfo,
  getAdminInfoById,
  getAllAdminInfos,
  updateAdminInfoById,
  deleteAdminInfoById,
};

const {
  addBriefIntro,
  getIntro,
  getIntros,
  updateIntro,
  deleteIntro,
} = require("../models/briefIntroModel");

const createBriefIntro = async (req, res) => {
  try {
    const introData = req.body;
    const saveIntro = await addBriefIntro(introData);
    res.status(201).json({
      message: "Brief introduction saved successfully.",
      message: saveIntro,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save brief introduction." });
  }
};

const getIntroById = async (req, res) => {
  const { id } = req.params;
  try {
    const intro = await getIntro(id);
    if (intro) {
      res.status(200).json(intro);
    } else {
      res.status(404).json({ message: "Brief introduction data not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve brief introduction data.", error });
  }
};

const getAllIntros = async (req, res) => {
  try {
    const allIntros = await getIntros();
    if (allIntros) {
      res.status(200).json(allIntros);
    } else {
      res.status(404).json({ message: "No brief introduction found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve brief introduction.", error });
  }
};

const updateIntroById = async (req, res) => {
  try {
    const { id } = req.params;
    const introData = req.body;
    const result = await updateIntro(id, introData);
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({ message: "Brief introduction updated successfully." });
    } else {
      res.status(404).json({ message: "Brief introduction data not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update brief introduction.", error });
  }
};

const deleteIntroById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteIntro(id);
    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Brief introduction deleted successfully." });
    } else {
      res.status(404).json({ message: "Brief introduction data not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete brief introduction data." }, error);
  }
};

module.exports = {
  createBriefIntro,
  getIntroById,
  getAllIntros,
  updateIntroById,
  deleteIntroById,
};

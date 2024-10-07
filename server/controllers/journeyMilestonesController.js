const journeyMilestones = require("../models/journeyMilestonesModel");

const createJourneyMilestone = async (req, res) => {
  try {
    const milestoneData = req.body;
    const result = await journeyMilestones.create(milestoneData);
    const createdMilestone = { ...milestoneData, _id: result.insertedId };
    console.log("created Journey Milestone:", createdMilestone);
    res.status(201).json({
      message: "Journey milestone created successfully!",
      result: createdMilestone,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getJourneyMilestone = async (req, res) => {
  try {
    const milestoneData = await journeyMilestones.getById(req.params.id);
    if (!milestoneData) {
      res.status(404).json({ message: "Journey milestone data not found!" });
    }
    res.status(200).json(milestoneData);
  } catch (error) {
    res.status(500).json({ message: "server error!", error: error.message });
  }
};

const getAllJourneyMilestones = async (req, res) => {
  try {
    const milestonesData = await journeyMilestones.getJourneyMilestones();
    if (!milestonesData) {
      res.status(404).json({ message: "Journey milestones data not found!" });
    }
    res.status(200).json(milestonesData);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

const updateJourneyMilestone = async (req, res) => {
  try {
    const milestoneData = req.body;
    const result = await journeyMilestones.updateById(
      req.params.id,
      milestoneData
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Journey milestone data not found!" });
    }
    res
      .status(200)
      .json({ message: "Journey milestone data updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "server error!", error: error.message });
  }
};

const deleteJourneyMilestoneById = async (req, res) => {
  try {
    const result = await journeyMilestones.deleteById(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Journey milestone data not found!" });
    }
    res
      .status(200)
      .json({ message: "Journey milestone data deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createJourneyMilestone,
  getJourneyMilestone,
  getAllJourneyMilestones,
  updateJourneyMilestone,
  deleteJourneyMilestoneById,
};

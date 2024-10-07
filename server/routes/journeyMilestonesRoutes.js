const express = require("express");

const {
  createJourneyMilestone,
  getJourneyMilestone,
  getAllJourneyMilestones,
  updateJourneyMilestone,
  deleteJourneyMilestoneById,
} = require("../controllers/journeyMilestonesController");

const {
  validateJourneyMilestonesMiddlewareRules,
  validate,
  validateJourneyMilestoneById,
} = require("../middlewares/validateJourneyMilestonesMiddleware");

const router = express.Router();

router.post(
  "/",
  validateJourneyMilestonesMiddlewareRules(),
  validate,
  createJourneyMilestone
);
router.get("/:id", validateJourneyMilestoneById, getJourneyMilestone);
router.get("/", getAllJourneyMilestones);
router.patch(
  "/:id",
  validateJourneyMilestoneById,
  validateJourneyMilestonesMiddlewareRules(),
  validate,
  updateJourneyMilestone
);
router.delete("/:id", validateJourneyMilestoneById, deleteJourneyMilestoneById);

module.exports = router;

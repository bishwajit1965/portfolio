const express = require("express");

const {
  validateTestimonialData,
  validateTestimonialById,
} = require("../middlewares/validateTestimonialData");

const {
  createTestimonial,
  getTestimonialById,
  getAllTestimonials,
  deleteTestimonialById,
  updateTestimonialById,
} = require("../controllers/testimonialController");

const router = express.Router();

router.post("/", validateTestimonialData, createTestimonial);
router.get("/:id", validateTestimonialById, getTestimonialById);
router.get("/", getAllTestimonials);
router.patch(
  "/:id",
  validateTestimonialData,
  validateTestimonialById,
  updateTestimonialById
);
router.delete("/:id", validateTestimonialById, deleteTestimonialById);

module.exports = router;

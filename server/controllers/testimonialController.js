const {
  addTestimonial,
  getTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../models/testimonialModel");

const createTestimonial = async (req, res) => {
  const testimonialData = req.body;
  const saveTestimonial = await addTestimonial(testimonialData);
  res.status(201).json({
    message: "Testimonial added successfully",
    message: saveTestimonial,
  });
};

const getTestimonialById = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await getTestimonial(id);
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res.status(404).json({ message: "Testimonial data not found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve testimonial data.", error });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await getTestimonials();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve testimonial", error });
  }
};

const updateTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonialData = req.body;
    const result = await updateTestimonial(id, testimonialData);
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({ message: "Testimonial data updated successfully." });
    } else {
      res.status(404).json({
        message: "Testimonial not found.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update testimonial data.", error });
  }
};

const deleteTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTestimonial(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Testimonial deleted successfully." });
    } else {
      res.status(404).json({ message: "Testimonial not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
};

module.exports = {
  createTestimonial,
  getTestimonialById,
  getAllTestimonials,
  updateTestimonialById,
  deleteTestimonialById,
};

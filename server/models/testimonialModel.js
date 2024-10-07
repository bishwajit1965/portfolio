const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

const addTestimonial = async (testimonialData) => {
  const db = getDB();
  const testimonial = await db
    .collection("testimonials")
    .insertOne(testimonialData);
  return testimonial;
};

const getTestimonial = async (id) => {
  const db = getDB();
  const testimonial = await db
    .collection("testimonials")
    .findOne({ _id: new ObjectId(id) });
  return testimonial;
};

const getTestimonials = async () => {
  const db = getDB();
  const testimonials = await db
    .collection("testimonials")
    .find(
      {},
      { projection: { _id: 1, name: 1, email: 1, rating: 1, testimonial: 1 } }
    )
    .toArray();
  return testimonials;
};

const updateTestimonial = async (id, updateTestimonial) => {
  const db = getDB();
  // Create a new ObjectId instance from the provided id
  const objectId = new ObjectId(id);
  // Remove the _id from updateTestimonial data if it exists to avoid conflict
  const { _id, ...updateFields } = updateTestimonial;
  const result = await db
    .collection("testimonials")
    .updateOne({ _id: objectId }, { $set: updateFields });
  return result;
};

const deleteTestimonial = async (id) => {
  try {
    const db = getDB();
    const result = await db
      .collection("testimonials")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {}
};

module.exports = {
  addTestimonial,
  getTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
};

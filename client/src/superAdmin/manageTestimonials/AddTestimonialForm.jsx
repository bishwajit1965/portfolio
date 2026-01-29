import { useState, useEffect } from "react";
import MiniButton from "../../components/buttons/MiniButton";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { FaCirclePlus, FaPlus } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { FaSave, FaTimes } from "react-icons/fa";

const AddTestimonialForm = ({ existingData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    testimonial: "",
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    rating: 5,
    photo: "",
    location: "",
    projectName: "",
    email: "",
    socialLinks: [""],
    isVisible: true,
    order: 1,
    tags: [""],
  });

  useEffect(() => {
    if (existingData) setFormData(existingData);
  }, [existingData]);

  const handleChange = (e, index = null, field = null) => {
    const { name, value, type, checked } = e.target;

    if (name === "socialLinks") {
      const newLinks = [...formData.socialLinks];
      newLinks[index] = value;
      setFormData({ ...formData, socialLinks: newLinks });
    } else if (name === "tags") {
      const newTags = [...formData.tags];
      newTags[index] = value;
      setFormData({ ...formData, tags: newTags });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSocialLink = () =>
    setFormData({ ...formData, socialLinks: [...formData.socialLinks, ""] });

  const addTag = () =>
    setFormData({ ...formData, tags: [...formData.tags, ""] });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // call parent handler
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Add project</title>
      </Helmet>
      <SuperAdminPageTitle
        title="Add"
        decoratedText="New Testimonial"
        subtitle="Super admin can manage testimonials!"
        icon={FaCirclePlus}
      />

      <form
        className="bg-base-200 p-4 rounded-md shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="input input-bordered w-full col-span-2"
          />
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            className="input input-bordered w-full col-span-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            value={formData.rating}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="order"
            min={1}
            value={formData.order}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            className="input input-bordered w-full col-span-2"
          />
        </div>

        <textarea
          name="testimonial"
          placeholder="Testimonial text"
          value={formData.testimonial}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        />

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
            />
            Visible
          </label>
        </div>

        {/* Social Links */}
        <div>
          <label className="font-bold">Social Links</label>
          {formData.socialLinks.map((link, i) => (
            <input
              key={i}
              type="text"
              name="socialLinks"
              placeholder="https://"
              value={link}
              onChange={(e) => handleChange(e, i)}
              className="input input-bordered w-full mt-1"
            />
          ))}
          <MiniButton
            type="button"
            variant="success"
            icon={<FaPlus />}
            onClick={addSocialLink}
            className="mt-2"
          >
            Add Social Link
          </MiniButton>
        </div>

        {/* Tags */}
        <div>
          <label className="font-bold">Tags</label>
          {formData.tags.map((tag, i) => (
            <input
              key={i}
              type="text"
              name="tags"
              placeholder="Tag"
              value={tag}
              onChange={(e) => handleChange(e, i, "tags")}
              className="input input-bordered w-full mt-1"
            />
          ))}
          <MiniButton
            variant="success"
            type="button"
            onClick={addTag}
            icon={<FaPlus />}
            size="sm"
            className="mt-2"
          >
            Add Tag
          </MiniButton>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <MiniButton
            type="submit"
            variant="default"
            icon={<FaSave />}
            label={existingData ? "Update" : "Create"}
            className="btn-primary"
          />
          <MiniButton
            type="button"
            variant="warning"
            icon={<FaTimes />}
            onClick={onCancel}
            label="Cancel"
            className="btn-secondary"
          />
        </div>
      </form>
    </>
  );
};

export default AddTestimonialForm;

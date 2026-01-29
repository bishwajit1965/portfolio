import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import MiniButton from "../../components/buttons/MiniButton";

const UpdateTestimonialModal = ({
  selectedTestimonial,
  onClose,
  onAdd,
  onUpdate,
  formToggler,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    testimonial: "",
    rating: 5,
    projectName: "",
    location: "",
    photo: "",
    email: "",
    date: "",
    isVisible: true,
    order: 0,
    socialLinks: [],
    tags: [],
  });
  console.log("Form data", formData);
  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      company: "",
      testimonial: "",
      rating: 5,
      projectName: "",
      location: "",
      photo: "",
      email: "",
      date: "",
      isVisible: true,
      order: 0,
      socialLinks: [],
      tags: [],
    });
  };

  useEffect(() => {
    if (selectedTestimonial) {
      setFormData(selectedTestimonial);
    } else {
      resetForm();
    }
  }, [selectedTestimonial]);

  const addSocialLink = () =>
    setFormData({ ...formData, socialLinks: [...formData.socialLinks, ""] });

  const addTag = () =>
    setFormData({ ...formData, tags: [...formData.tags, ""] });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const updateArrayField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (selectedTestimonial) {
        await onUpdate(formData?._id, formData);
        formToggler(false);
      } else {
        await onAdd(formData);
        resetForm();
        formToggler(false);
      }
    } catch (error) {
      console.error("Error in testimonial CRUD", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div
        style={styles.modalContent}
        className="lg:max-w-3xl w-full space-y-2"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-slate-600 font-bold flex items-center gap-2">
            {selectedTestimonial ? <FaEdit /> : <FaSave />}
            {selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
          </h2>

          <button
            onClick={onClose}
            className="lg:h-8 lg:w-8 h-6 w-6 rounded-full bg-base-300 flex items-center justify-center p-2 hover:bg-base-200 hover:text-red-500 shadow-sm"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-96 overflow-y-auto lg:p-4 p-2"
        >
          <div style={styles.formGroup} className="space-y-2 p-1">
            <div className="lg:flex grid items-center justify-between gap-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData?.name}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
            </div>

            <div className="lg:flex grid items-center justify-between gap-2">
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />

              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
            </div>
            <div className="lg:flex grid items-center justify-between gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
            </div>

            <div className="lg:flex grid items-center justify-between gap-2">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
              <input
                type="number"
                name="rating"
                min={1}
                max={5}
                value={formData.rating}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
            </div>

            <div className="lg:flex grid items-center justify-between gap-2">
              <input
                type="number"
                name="order"
                min={1}
                value={formData.order}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
              />
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                value={formData.photo}
                onChange={handleChange}
                className="input input-bordered input-sm w-full col-span-2"
                style={styles.input}
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

            <div className="flex justify-start">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleChange}
                  style={styles.input}
                />
                Visible
              </label>
            </div>

            {/* Social Links */}
            <div>
              <label className="font-bold block">Social Links</label>
              {formData.socialLinks.map((link, i) => (
                <input
                  key={i}
                  type="text"
                  name="socialLinks"
                  placeholder="https://..."
                  value={link}
                  onChange={(e) =>
                    updateArrayField("socialLinks", i, e.target.value)
                  }
                  //   onChange={(e) => handleChange(e, i)}
                  className="input input-bordered input-sm w-full mt-1"
                  style={styles.input}
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
              <label className="font-bold block">Tags</label>
              {formData.tags.map((tag, i) => (
                <input
                  key={i}
                  type="text"
                  name="tags"
                  placeholder="Tag"
                  value={tag}
                  //   onChange={(e) => handleChange(e, i, "tags")}
                  onChange={(e) => updateArrayField("tags", i, e.target.value)}
                  className="input input-bordered input-sm w-full mt-1"
                  style={styles.input}
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
          </div>
          <div className="flex items-center gap-2 justify-end">
            <MiniButton
              variant="default"
              icon={<FaEdit />}
              label={
                formData?._id
                  ? "Update"
                  : formData?._id && loading
                    ? "Updating..."
                    : loading
                      ? "Saving..."
                      : "Save"
              }
              type="submit"
            />

            <MiniButton
              type="button"
              variant="warning"
              icon={<FaTimes />}
              onClick={onClose}
              label="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// Simple inline styles for demonstration; consider using CSS or styled-components
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "700px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.26)",
  },
  formGroup: {
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "4px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonPrimary: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginRight: "8px",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateTestimonialModal;

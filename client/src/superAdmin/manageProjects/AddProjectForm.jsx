import { FaSave, FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import Button from "../../components/buttons/Button";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { FaCirclePlus } from "react-icons/fa6";
import Swal from "sweetalert2";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    mainImage: null,
    categories: [], // [{ name: "", screenshots: [{ file: null, caption: "" }] }]
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Basic fields
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Categories
  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { name: "", screenshots: [] }],
    });
  };

  const removeCategory = (index) => {
    const updated = [...formData.categories];
    updated.splice(index, 1);
    setFormData({ ...formData, categories: updated });
  };

  const updateCategoryName = (index, value) => {
    const updated = [...formData.categories];
    updated[index].name = value;
    setFormData({ ...formData, categories: updated });
  };

  // Screenshots
  const addScreenshot = (catIndex) => {
    const updated = [...formData.categories];
    updated[catIndex].screenshots.push({ file: null, caption: "" });
    setFormData({ ...formData, categories: updated });
  };

  const removeScreenshot = (catIndex, shotIndex) => {
    const updated = [...formData.categories];
    updated[catIndex].screenshots.splice(shotIndex, 1);
    setFormData({ ...formData, categories: updated });
  };

  const handleFileChange = (catIndex, shotIndex, file) => {
    const updated = [...formData.categories];
    updated[catIndex].screenshots[shotIndex].file = file;
    setFormData({ ...formData, categories: updated });
  };

  const handleCaptionChange = (catIndex, shotIndex, caption) => {
    const updated = [...formData.categories];
    updated[catIndex].screenshots[shotIndex].caption = caption;
    setFormData({ ...formData, categories: updated });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (formData.categories.length === 0)
      newErrors.categories = "At least one category required";

    formData.categories.forEach((cat, ci) => {
      if (!cat.name) newErrors[`category-${ci}`] = "Category name required";
      if (cat.screenshots.length === 0)
        newErrors[`screenshots-${ci}`] = "At least one screenshot required";
      cat.screenshots.forEach((shot, si) => {
        if (!shot.file)
          newErrors[`screenshot-${ci}-${si}`] = "Screenshot file required";
      });
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }

    setLoading(true);
    try {
      const data = new FormData();

      // Basic fields
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("description", formData.description);

      // Main image
      if (formData.mainImage) data.append("mainImage", formData.mainImage);

      // Screenshots + categories
      formData.categories.forEach((cat) => {
        cat.screenshots.forEach((shot) => {
          if (shot.file) data.append("screenshots", shot.file); // all screenshot files
          data.append("categoryNames", cat.name); // parallel array
          data.append("captions", shot.caption || ""); // parallel array
        });
      });

      // 2️⃣ Send to backend
      const res = await api.post("/projects", data);

      if (res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Project added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setSuccessMessage("Project added successfully!");
        setFormData({
          name: "",
          type: "",
          description: "",
          mainImage: null,
          categories: [],
        });
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to add project" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Add project</title>
      </Helmet>

      <SuperAdminPageTitle
        title="Add"
        decoratedText="New Project"
        subtitle="Super admin can manage projects!"
        icon={FaCirclePlus}
      />

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mx-auto p-4 rounded shadow bg-base-100"
      >
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Basic fields */}
        {["name", "type", "description"].map((field) => (
          <div key={field} className="mb-2">
            <label className="block font-medium capitalize">{field}:</label>
            {field !== "description" ? (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="mt-1 file-input-bordered block w-full border p-2 rounded"
              />
            ) : (
              <textarea
                value={formData.description}
                onChange={(e) => handleChange(field, e.target.value)}
                className="mt-1 block w-full border p-2 rounded"
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="my-4">
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, mainImage: e.target.files[0] })
            }
            className="border p-1 file-input file-input-bordered w-full"
          />
        </div>

        {/* Categories */}
        {formData.categories.map((cat, ci) => (
          <div key={ci} className="mb-4 border p-2 rounded bg-gray-50">
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                placeholder="Category name"
                value={cat.name}
                onChange={(e) => updateCategoryName(ci, e.target.value)}
                className="border input-md input-bordered p-1 rounded w-full"
              />
              <Button
                icon={<FaTrash />}
                variant="danger"
                md
                label="Delete"
                size="sm"
                onClick={() => removeCategory(ci)}
              />
            </div>
            {errors[`category-${ci}`] && (
              <p className="text-red-500 text-sm">{errors[`category-${ci}`]}</p>
            )}

            {/* Screenshots */}
            {cat.screenshots.map((shot, si) => (
              <div key={si} className="flex gap-2 mt-2 items-center space-y-2">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(ci, si, e.target.files[0])}
                  className="border p-1 mt-2 file-input file-input-bordered rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Caption"
                  value={shot.caption}
                  onChange={(e) => handleCaptionChange(ci, si, e.target.value)}
                  className="border p-1 input-md input-bordered rounded w-2/3"
                />
                <Button
                  icon={<FaTrash />}
                  variant="danger"
                  label="Delete"
                  size="sm"
                  onClick={() => removeScreenshot(ci, si)}
                />
                {errors[`screenshot-${ci}-${si}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`screenshot-${ci}-${si}`]}
                  </p>
                )}
              </div>
            ))}
            <Button
              icon={<FaPlus />}
              variant="outline"
              size="sm"
              onClick={() => addScreenshot(ci)}
              label="Add Screenshot"
              className="m-2"
            />
          </div>
        ))}

        <Button
          icon={<FaPlus />}
          variant="outline"
          size="sm"
          onClick={addCategory}
          label="Add Category"
        />

        <div
          className={`${loading ? "cursor-not-allowed opacity-50 bg-red-200 rounded-md" : ""} mt-4`}
        >
          <Button
            type="submit"
            variant="base"
            icon={loading ? <FaSpinner /> : <FaSave />}
            label={loading ? "Adding..." : "Add Project"}
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
};

export default AddProjectForm;

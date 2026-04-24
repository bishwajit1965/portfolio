import {
  FaSave,
  FaPlus,
  FaTrash,
  FaSpinner,
  FaHome,
  FaDatabase,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import Button from "../../components/buttons/Button";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    projectLabel: "",
    description: "",
    githubLink: "",
    liveLink: "",
    mainImage: null,
    categories: [], // [{ name: "", screenshots: [{ file: null, caption: "" }] }]
    techStacks: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRedirectToProjectManagement = () => {
    navigate("/super-admin/manage-projects");
  };

  // Basic field update
  const handleChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

  // Categories
  const addCategory = () =>
    setFormData({
      ...formData,
      categories: [...formData.categories, { name: "", screenshots: [] }],
    });

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

  // TechStacks
  const addTechStack = () =>
    setFormData({ ...formData, techStacks: [...formData.techStacks, ""] });

  const updateArrayField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const removeTechStack = (index) => {
    const updated = [...formData.techStacks];
    updated.splice(index, 1);
    setFormData({ ...formData, techStacks: updated });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.type) newErrors.type = "Type is required";

    if (!formData.projectLabel) newErrors.type = "Project label is required";

    if (!formData.description)
      newErrors.description = "Description is required";

    if (!formData.githubLink) newErrors.githubLink = "GitHub link is required";

    if (!formData.liveLink) newErrors.liveLink = "Live link is required";

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

    if (formData.techStacks.length === 0)
      newErrors.techStacks = "At least one tech stack required";

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // -------------------------------
      // Basic fields
      // -------------------------------
      [
        "name",
        "type",
        "projectLabel",
        "description",
        "githubLink",
        "liveLink",
      ].forEach((field) => data.append(field, formData[field]));

      // -------------------------------
      // Main image
      // -------------------------------
      if (formData.mainImage) {
        data.append("mainImage", formData.mainImage);
      }

      // -------------------------------
      // Screenshots (structured)
      // -------------------------------
      const screenshotsMeta = [];

      formData.categories.forEach((cat) => {
        cat.screenshots.forEach((shot) => {
          if (shot.file) {
            // file goes separately
            data.append("screenshotFiles", shot.file);

            // meta goes into array
            screenshotsMeta.push({
              category: cat.name,
              caption: shot.caption || "",
            });
          }
        });
      });

      // send metadata as JSON
      data.append("screenshotsMeta", JSON.stringify(screenshotsMeta));

      // -------------------------------
      // Tech stacks
      // -------------------------------
      formData.techStacks.forEach((tech) => data.append("techStacks", tech));

      // -------------------------------
      // API call
      // -------------------------------
      const res = await api.post("/projects", data);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Project added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // reset form
        setFormData({
          name: "",
          type: "",
          projectLabel: "",
          description: "",
          githubLink: "",
          liveLink: "",
          mainImage: null,
          categories: [],
          techStacks: [],
        });

        setErrors({});
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to add project" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dark:bg-slate-800 admin-dark:text-slate-400">
      <Helmet>
        <title>Bishwajit.dev || Add project</title>
      </Helmet>
      <SuperAdminPageSubHeader
        title="Add"
        decoratedText="New Projects"
        // dataLength={projects.length}
        variant="success"
        buttonLabel="Project Management"
        icon={<FaArrowAltCircleRight />}
        labelIcon={<FaDatabase />}
        size="lg"
        onButtonClick={handleRedirectToProjectManagement}
      />
      <div className="lg:p-6 p-2">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mx-auto lg:p-6 p-2 rounded-lg shadow border border-slate-200 admin-dark:border-slate-700 hover:shadow-xl"
        >
          {errors.general && <p className="text-red-500">{errors.general}</p>}

          {/* Basic fields */}
          {[
            "name",
            "type",
            "projectLabel",
            "description",
            "githubLink",
            "liveLink",
          ].map((field) => (
            <div key={field} className="mb-2">
              <label className="block font-medium capitalize">{field}:</label>
              {field !== "description" ? (
                <input
                  type={field.includes("Link") ? "url" : "text"}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="mt-1 file-input-bordered block w-full border p-2 rounded capitalize admin-dark:bg-slate-800 admin-dark:border-slate-700"
                  placeholder={field}
                />
              ) : (
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={field}
                  className="mt-1 block w-full border p-2 rounded capitalize admin-dark:bg-slate-800 admin-dark:border-slate-700"
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Main Image */}
          <div className="my-4">
            <input
              type="file"
              name="mainImage"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, mainImage: e.target.files[0] })
              }
              className="border p-1 file-input file-input-bordered w-full admin-dark:bg-slate-800 admin-dark:border-slate-700"
            />
          </div>

          {/* Categories + Screenshots */}
          {formData.categories.map((cat, ci) => (
            <div
              key={ci}
              className="mb-4 border p-2 rounded bg-gray-50 admin-dark:bg-slate-800 admin-dark:border-slate-700"
            >
              <div className="flex justify-between items-center gap-2 admin-dark:bg-slate-800 admin-dark:border-slate-700">
                <input
                  type="text"
                  placeholder="Category name"
                  value={cat.name}
                  onChange={(e) => updateCategoryName(ci, e.target.value)}
                  className="border input-md input-bordered p-1 rounded w-full admin-dark:bg-slate-800 admin-dark:border-slate-700"
                />
                <Button
                  icon={<FaTrash />}
                  variant="danger"
                  size="sm"
                  label="Delete"
                  onClick={() => removeCategory(ci)}
                />
              </div>
              {errors[`category-${ci}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`category-${ci}`]}
                </p>
              )}

              {cat.screenshots.map((shot, si) => (
                <div
                  key={si}
                  className="flex gap-2 mt-2 items-center space-y-2 admin-dark:bg-slate-800 admin-dark:border-slate-700"
                >
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(ci, si, e.target.files[0])
                    }
                    className="border p-1 mt-2 file-input file-input-bordered rounded w-1/3 admin-dark:bg-slate-800 admin-dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Caption"
                    value={shot.caption}
                    onChange={(e) =>
                      handleCaptionChange(ci, si, e.target.value)
                    }
                    className="border p-1 input-md input-bordered rounded w-2/3 admin-dark:bg-slate-800 admin-dark:border-slate-700"
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

          {/* TechStacks */}
          <div className="my-2">
            <label className="font-bold block">Tech Stacks</label>
            {formData.techStacks.map((techStack, i) => (
              <div
                key={i}
                className="flex gap-2 items-center space-y-2 admin-dark:bg-slate-800 admin-dark:border-slate-700"
              >
                <input
                  type="text"
                  name="techStacks"
                  placeholder="Tech Stack"
                  value={techStack}
                  onChange={(e) =>
                    updateArrayField("techStacks", i, e.target.value)
                  }
                  className="input input-bordered w-full mt-1 admin-dark:bg-slate-800 admin-dark:border-slate-700"
                />
                <Button
                  icon={<FaTrash />}
                  variant="danger"
                  label="Delete"
                  size="sm"
                  onClick={() => removeTechStack(i)}
                />
              </div>
            ))}
            <Button
              variant="outline"
              type="button"
              onClick={addTechStack}
              icon={<FaPlus />}
              size="sm"
              className="mt-2"
            >
              Add Tech Stack
            </Button>
          </div>
          <div className="divider">Form Fields End</div>
          {/* Submit */}
          <div className="lg:flex grid gap-4">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={
                loading ? (
                  <FaSpinner size={18} className="animate-spin" />
                ) : (
                  <FaSave size={18} />
                )
              }
              label={loading ? "Adding..." : "Add Project"}
              disabled={loading}
            />
            <Link to="/super-admin/manage-projects">
              <Button
                type="submit"
                variant="warning"
                size="md"
                label="View Projects"
                icon={<FaHome />}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;

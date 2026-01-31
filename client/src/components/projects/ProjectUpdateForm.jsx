import { FaCog, FaEdit, FaHome, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import api from "../../services/api";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Button from "../buttons/Button";

const ProjectUpdateForm = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    githubLink: "",
    liveLink: "",
    visibility: "visible",
    screenshots: [],
    techStacks: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [captions, setCaptions] = useState([]);

  /* ----------------------------------
     Fetch existing project
  ---------------------------------- */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`);
        const data = res.data;

        setFormData({
          name: data.name,
          type: data.type,
          description: data.description,
          githubLink: data.githubLink || "",
          liveLink: data.liveLink || "",
          visibility: data.visibility,
          screenshots: data.screenshots || [],
          techStacks: data.techStacks || [],
        });

        setCategory(""); // start empty for new screenshots
        setCaptions([]);
      } catch (err) {
        console.error(err);
        setErrors({ general: "Failed to load project data" });
      }
    };
    fetchProject();
  }, [projectId]);

  /* ----------------------------------
     Preview
  ---------------------------------- */
  const mainImagePreview = formData.image
    ? `http://localhost:5000/uploads/${formData.image}`
    : null;

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleScreenshotsChange = (e) => {
    setScreenshotFiles([...e.target.files]);
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (screenshotFiles.length > 0 && !category.trim()) {
      setErrors({ category: "Category is required for screenshots" });
      return;
    }

    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("type", formData.type);
    formToSend.append("description", formData.description);
    formToSend.append("githubLink", formData.githubLink);
    formToSend.append("liveLink", formData.liveLink);
    formToSend.append("visibility", formData.visibility);

    if (mainImage) {
      formToSend.append("mainImage", mainImage);
    }

    if (screenshotFiles.length > 0) {
      formToSend.append("category", category);
      screenshotFiles.forEach((file) => formToSend.append("screenshots", file));
      captions.forEach((cap) => formToSend.append("captions", cap));
    }

    // TechStacks
    formData?.techStacks?.forEach((techStack) => {
      formToSend.append("techStacks", techStack); // parallel array
    });

    try {
      setLoading(true);
      const res = await api.patch(`/projects/${projectId}`, formToSend);

      if (res.status === 200) {
        setSuccessMessage("Project updated successfully");
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 2000);
        setMainImage(null);
        setScreenshotFiles([]);
        setCategory("");
        setCaptions([]);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Project update failed" });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <>
      <Helmet>
        <title>Edit Project || Web-tech-services</title>
      </Helmet>

      <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

      <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview Main Image */}
          <div className="w-full">
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt={formData.name}
                className="w-full h-full rounded-md"
              />
            ) : (
              <div className="h-full flex items-center justify-center border rounded-md dark:border-slate-700 text-slate-400">
                No main image
              </div>
            )}
          </div>

          {/* Form */}
          <div className="dark:border dark:border-slate-700 p-3 rounded-md">
            <h2 className="text-2xl font-bold mb-2 flex items-center border-b pb-2">
              <FaEdit className="mr-2" /> Update Project
            </h2>

            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            {errors.general && <p className="text-red-500">{errors.general}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name */}
              <div className="mb-3">
                <label className="text-sm">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Type */}
              <div className="mb-3">
                <label className="text-sm">Type</label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* GitHub Link */}
              <div className="mb-3">
                <label className="text-sm">GitHub Link</label>
                {formData.githubLink && (
                  <p className="text-blue-600 underline mb-1">
                    <a
                      href={formData.githubLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {formData.githubLink}
                    </a>
                  </p>
                )}
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* GitHub Link */}
              <div className="mb-3">
                <label className="text-sm">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData?.githubLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Live Link */}
              <div className="mb-3">
                <label className="text-sm">Live Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData?.liveLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Main Image */}
              <div className="mb-3">
                <label className="text-sm">Main Image</label>
                <input
                  type="file"
                  name="mainImage"
                  onChange={handleMainImageChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Screenshot Category */}
              <div className="mb-3">
                <label className="text-sm">Screenshot Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="UI Screens / Admin Panel / Mobile"
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>

              {/* Screenshots */}
              <div className="mb-3">
                <label className="text-sm">Screenshots</label>
                <input
                  type="file"
                  multiple
                  name="screenshots"
                  onChange={handleScreenshotsChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
                {screenshotFiles.map((file, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder="Caption"
                    value={captions[idx] || ""}
                    onChange={(e) => handleCaptionChange(idx, e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 mt-1"
                  />
                ))}
              </div>

              {/* TechStacks */}
              <div className="my-2">
                <label className="font-bold block">Tech Stacks</label>
                {formData?.techStacks?.map((techStack, i) => (
                  <div key={i} className="flex gap-2 items-center space-y-2">
                    <input
                      key={i}
                      type="text"
                      name="techStacks"
                      placeholder="Tech Stacks"
                      value={techStack}
                      onChange={(e) =>
                        updateArrayField("techStacks", i, e.target.value)
                      }
                      className="input input-bordered w-full mt-1"
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

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-sm btn-success text-white"
                >
                  {loading ? "Updating..." : "Update Project"}
                </button>

                <Link
                  to="/super-admin/manage-projects"
                  className="btn btn-sm btn-primary text-white flex items-center"
                >
                  <FaHome className="mr-1" /> Home
                </Link>

                <Link
                  to="/super-admin/manage-projects"
                  className="btn btn-sm btn-success text-white flex items-center"
                >
                  <FaCog className="mr-1" /> All Projects
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectUpdateForm;

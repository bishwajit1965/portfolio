import { useEffect, useRef, useState } from "react";
import { FaPlusCircle, FaSpinner, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import CTAButton from "../ctaButton/CTAButton";
import MiniButton from "../../components/buttons/MiniButton";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProjectForm = ({ mode = "add" }) => {
  const { projectId } = useParams();
  const fileInputRef = useRef(null);

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
    image: "",
    screenshots: [],
    techStacks: [],
  });

  const [mainImageFile, setMainImageFile] = useState(null);

  // -------------------------------
  // Fetch project data if edit mode
  // -------------------------------
  useEffect(() => {
    if (mode === "edit" && projectId) {
      const fetchProject = async () => {
        try {
          const res = await api.get(`/projects/${projectId}`);
          setFormData(res.data);
        } catch (err) {
          console.error(err);
          setErrors({ general: "Failed to load project data" });
        }
      };
      fetchProject();
    }
  }, [mode, projectId]);

  // -------------------------------
  // Handlers
  // -------------------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setErrors({ ...errors, mainImage: "File exceeds 5MB" });
      return;
    }
    setErrors({ ...errors, mainImage: null });
    setMainImageFile(file);
  };

  const handleScreenshotChange = (catIndex, itemIndex, e) => {
    const updated = [...formData.screenshots];
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file && file.size > MAX_FILE_SIZE) {
        setErrors({ ...errors, screenshots: "File exceeds 5MB" });
        return;
      }
      updated[catIndex].items[itemIndex].newImageFile = file;
    } else {
      updated[catIndex].items[itemIndex].caption = e.target.value;
    }
    setFormData({ ...formData, screenshots: updated });
  };

  const handleAddNewCategory = () =>
    setFormData({
      ...formData,
      screenshots: [
        ...formData.screenshots,
        { id: Date.now().toString(), category: "", items: [] },
      ],
    });

  const handleAddNewItem = (catIndex) => {
    const updated = [...formData.screenshots];
    updated[catIndex].items.push({
      id: Date.now().toString(),
      image: "",
      caption: "",
    });
    setFormData({ ...formData, screenshots: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const dataToSend = new FormData();

      // Basic fields
      [
        "name",
        "type",
        "description",
        "githubLink",
        "liveLink",
        "visibility",
      ].forEach((field) => dataToSend.append(field, formData[field] || ""));

      // Main image
      if (mainImageFile) dataToSend.append("mainImage", mainImageFile);

      // Screenshots
      formData.screenshots.forEach((cat) =>
        cat.items.forEach((item) => {
          if (item.newImageFile) {
            dataToSend.append("screenshots", item.newImageFile);
            dataToSend.append("captions", item.caption || "");
            dataToSend.append("categories", cat.category);
            dataToSend.append("itemIds", item.id);
          }
        }),
      );

      // Tech stacks
      formData.techStacks.forEach((tech) =>
        dataToSend.append("techStacks", tech),
      );

      let res;
      if (mode === "add") {
        res = await api.post("/projects", dataToSend);
      } else {
        res = await api.patch(`/projects/${projectId}`, dataToSend);
      }

      if (res.status === 200 || res.status === 201) {
        setSuccessMessage(
          mode === "add" ? "Project added!" : "Project updated!",
        );
        if (mode === "add") {
          setFormData({
            name: "",
            type: "",
            description: "",
            githubLink: "",
            liveLink: "",
            visibility: "visible",
            image: "",
            screenshots: [],
            techStacks: [],
          });
          setMainImageFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
        setTimeout(() => setSuccessMessage(""), 2000);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Render
  // -------------------------------
  const apiURL = import.meta.env.VITE_API_URL;
  const baseURL = `${apiURL}/uploads/`;

  return (
    <>
      <Helmet>
        <title>
          Web-tech-services || {mode === "add" ? "Add Project" : "Edit Project"}
        </title>
      </Helmet>

      <div className="lg:max-w-5xl mx-auto p-6 bg- rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center dark:text-emerald-500 animate-pulse">
          <FaPlusCircle className="mr-2" />
          {mode === "add" ? "Add New Project" : "Update Project"}
        </h2>
        <p>OK</p>
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Left: Basic Info + Screenshots */}
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
            <div className="lg:col-span-6 col-span-12 space-y-2">
              {/* Name */}
              <div>
                <label className="block text-sm">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm">Type</label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                  required
                />
              </div>

              {/* Screenshots */}
              <div>
                <label className="block font-bold mb-1">Screenshots</label>
                {formData.screenshots.map((cat, catIndex) => (
                  <div
                    key={cat.id}
                    className="border p-2 rounded mb-2 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cat.category}
                        placeholder="Category name"
                        onChange={(e) => {
                          const updated = [...formData.screenshots];
                          updated[catIndex].category = e.target.value;
                          setFormData({ ...formData, screenshots: updated });
                        }}
                        className="input input-sm input-bordered w-full dark:bg-slate-800"
                      />
                      <MiniButton
                        type="button"
                        variant="danger"
                        label="Delete"
                        icon={<FaTrashAlt />}
                        onClick={() => {
                          const updated = [...formData.screenshots];
                          updated.splice(catIndex, 1);
                          setFormData({ ...formData, screenshots: updated });
                        }}
                      />
                    </div>

                    {cat.items.map((item, itemIndex) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        {item.image && !item.newImageFile && (
                          <img
                            src={item.image.url || `${baseURL}${item.image}`}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        {item.newImageFile && (
                          <img
                            src={URL.createObjectURL(item.newImageFile)}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <input
                          type="text"
                          value={item.caption}
                          placeholder="Caption"
                          onChange={(e) =>
                            handleScreenshotChange(catIndex, itemIndex, e)
                          }
                          className="input input-sm input-bordered"
                        />
                        <input
                          type="file"
                          onChange={(e) =>
                            handleScreenshotChange(catIndex, itemIndex, e)
                          }
                          className="file-input input-sm"
                        />
                        <MiniButton
                          type="button"
                          variant="danger"
                          label="Delete"
                          icon={<FaTrashAlt />}
                          onClick={() => {
                            const updated = [...formData.screenshots];
                            updated[catIndex].items.splice(itemIndex, 1);
                            setFormData({ ...formData, screenshots: updated });
                          }}
                        />
                      </div>
                    ))}
                    <MiniButton
                      type="button"
                      variant="success"
                      label="Add Item"
                      icon={<FaPlus />}
                      onClick={() => handleAddNewItem(catIndex)}
                    />
                  </div>
                ))}
                <MiniButton
                  type="button"
                  variant="success"
                  label="Add Category"
                  icon={<FaPlus />}
                  onClick={handleAddNewCategory}
                />
              </div>
            </div>

            {/* Right: Links + Main Image + Tech Stack */}
            <div className="lg:col-span-6 col-span-12 space-y-2">
              {/* GitHub Link */}
              <div>
                <label className="text-sm">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Live Link */}
              <div>
                <label className="text-sm">Live Demo Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Main Image */}
              <div>
                <label className="text-sm">Main Image</label>
                <input
                  type="file"
                  onChange={handleMainImageChange}
                  ref={fileInputRef}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
                {mainImageFile && (
                  <img
                    src={URL.createObjectURL(mainImageFile)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}
                {!mainImageFile && formData.image && (
                  <img
                    src={formData?.image?.url || `${baseURL}${formData.image}`}
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <label className="text-sm block mb-2">Tech Stack</label>
                {formData.techStacks.map((tech, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const updated = [...formData.techStacks];
                        updated[i] = e.target.value;
                        setFormData({ ...formData, techStacks: updated });
                      }}
                      className="input input-sm input-bordered w-full"
                    />
                    <MiniButton
                      type="button"
                      variant="danger"
                      label="Delete"
                      icon={<FaTrashAlt />}
                      onClick={() => {
                        const updated = [...formData.techStacks];
                        updated.splice(i, 1);
                        setFormData({ ...formData, techStacks: updated });
                      }}
                    />
                  </div>
                ))}
                <MiniButton
                  type="button"
                  variant="success"
                  icon={<FaPlus />}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      techStacks: [...(formData.techStacks || []), ""],
                    })
                  }
                >
                  Add Tech Stack
                </MiniButton>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <CTAButton
              type="submit"
              label={
                loading
                  ? mode === "add"
                    ? "Uploading..."
                    : "Updating..."
                  : mode === "add"
                    ? "Add Project"
                    : "Update Project"
              }
              variant="primary"
              disabled={loading}
              icon={loading ? <FaSpinner /> : <FaPlusCircle />}
            />

            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;

import {
  FaCog,
  FaEdit,
  FaHome,
  FaPlus,
  FaPlusCircle,
  FaSpinner,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../services/api";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Button from "../../components/buttons/Button";

const ProjectUpdateForm = () => {
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiURL}/uploads/`;
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
    image: "",
    screenshots: [],
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  // const [newScreenshots, setNewScreenshots] = useState([]);

  /* ----------------------------------
     Fetch existing project
  ---------------------------------- */
  useEffect(() => {
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
  }, [projectId]);

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleScreenshotChange = (catIndex, itemIndex, e) => {
    const updated = [...formData.screenshots];
    if (e.target.type === "file") {
      updated[catIndex].items[itemIndex].newImageFile = e.target.files[0];
    } else {
      updated[catIndex].items[itemIndex].caption = e.target.value;
    }
    setFormData({ ...formData, screenshots: updated });
  };

  const handleAddNewCategory = () => {
    setFormData({
      ...formData,
      screenshots: [
        ...formData.screenshots,
        { id: Date.now().toString(), category: "", items: [] },
      ],
    });
  };

  const handleAddNewItem = (catIndex) => {
    const updated = [...formData.screenshots];
    updated[catIndex].items.push({
      id: Date.now().toString(),
      image: "",
      caption: "",
    });
    setFormData({ ...formData, screenshots: updated });
  };

  // const handleNewItemImage = (catIndex, itemIndex, e) => {
  //   const updated = [...formData.screenshots];
  //   updated[catIndex].items[itemIndex].newImageFile = e.target.files[0];
  //   setFormData({ ...formData, screenshots: updated });
  // };

  /* ----------------------------------
     Submit
  ---------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    dataToSend.append("name", formData.name);
    dataToSend.append("type", formData.type);
    dataToSend.append("description", formData.description);
    dataToSend.append("githubLink", formData.githubLink);
    dataToSend.append("liveLink", formData.liveLink);
    dataToSend.append("visibility", formData.visibility);

    if (mainImageFile) dataToSend.append("mainImage", mainImageFile);

    // Handle screenshots
    formData.screenshots.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.newImageFile) {
          dataToSend.append("screenshots", item.newImageFile);
          dataToSend.append("captions", item.caption || "");
          dataToSend.append("categories", cat.category);
          dataToSend.append("itemIds", item.id);
        }
      });
    });

    try {
      setLoading(true);
      const res = await api.patch(`/projects/${projectId}`, dataToSend);
      if (res.status === 200) {
        setSuccessMessage("Project updated successfully!");
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 2000);
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
        <title>Web-tech-services || Edit Project</title>
      </Helmet>

      <SuperAdminPageTitle title="Super Admin" decoratedText="Update Project" />

      <div className="lg:p-4 p-2 mt-2 dark:bg-slate-900 rounded-lg shadow-md">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4">
          {/* Preview Main Image */}
          <div className="lg:col-span-4 col-span-12">
            {formData.image && !mainImageFile ? (
              <img
                src={`${baseURL}${formData.image}`}
                alt={formData.name}
                className="w-full h-auto rounded-md object-contain"
              />
            ) : mainImageFile ? (
              <img
                src={URL.createObjectURL(mainImageFile)}
                alt="Preview"
                className="w-full h-full rounded-md object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center border rounded-md dark:border-slate-700 text-slate-400">
                No main image
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-8 col-span-12 dark:border dark:border-slate-700 p-3 rounded-md">
            <h2 className="text-2xl font-bold mb-2 flex items-center border-b pb-2">
              <FaEdit className="mr-2" /> Update Project
            </h2>

            {successMessage && (
              <p className="text-green-600 text-sm">{successMessage}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

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
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Live Demo Link */}
              <div className="mb-3">
                <label className="text-sm">Live Demo Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Main Image Upload */}
              <div className="mb-4">
                <label className="text-sm">Main Image</label>
                <input
                  type="file"
                  onChange={handleMainImageChange}
                  className="w-full p-2 border rounded-md dark:bg-slate-800"
                />
              </div>

              {/* Screenshots */}
              <div className="mb-4">
                <label className="text-sm font-bold">Screenshots</label>
                {formData.screenshots.map((cat, catIndex) => (
                  <div key={cat.id} className="border p-2 rounded-md mb-2">
                    <input
                      type="text"
                      value={cat.category}
                      placeholder="Category name"
                      onChange={(e) => {
                        const updated = [...formData.screenshots];
                        updated[catIndex].category = e.target.value;
                        setFormData({ ...formData, screenshots: updated });
                      }}
                      className="w-full mb-2 p-1 border rounded-md dark:bg-slate-800"
                    />

                    {cat.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="flex gap-2 items-center mb-2"
                      >
                        {item.image && !item.newImageFile && (
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.caption}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        {item.newImageFile && (
                          <img
                            src={URL.createObjectURL(item.newImageFile)}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <input
                          type="text"
                          value={item.caption}
                          placeholder="Caption"
                          onChange={(e) =>
                            handleScreenshotChange(catIndex, itemIndex, e)
                          }
                          className="p-1 border rounded-md dark:bg-slate-800"
                        />
                        <input
                          type="file"
                          onChange={(e) =>
                            handleScreenshotChange(catIndex, itemIndex, e)
                          }
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddNewItem(catIndex)}
                      className="btn btn-xs btn-primary flex items-center gap-1"
                    >
                      <FaPlus /> Add Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="btn btn-xs text-base-100 btn-success flex items-center gap-1"
                >
                  <FaPlus /> Add Category
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  icon={loading ? <FaSpinner /> : <FaEdit />}
                  size="sm"
                  className="btn btn-sm btn-success text-white"
                >
                  {loading ? "Updating..." : "Update Project"}
                </Button>

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
                <Link
                  to="/super-admin/add-project"
                  className="btn btn-sm btn-success text-white flex items-center"
                >
                  <FaPlusCircle className="mr-1" /> Add Project
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

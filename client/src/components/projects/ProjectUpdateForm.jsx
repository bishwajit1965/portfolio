import { FaEdit, FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";

const ProjectUpdateForm = () => {
  const { projectId } = useParams(); //Will get the projectId from the url
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  console.log(formData);
  const imageUrl = `http://localhost:5000/uploads/${formData.image}`;

  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`);
        setFormData(response.data); //Populate the data
      } catch (error) {
        console.error("Failed to fetch project", error);
        setErrors({ general: "An error occurred while updating project" });
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); //Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create formData object to handle both text and file inputs
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("description", formData.description);

    if (image) {
      formDataToSend.append("image", image);
    }
    // Log FormData to see what's being sent
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      setLoading(true);
      const response = await api.patch(
        `/projects/${projectId}`,
        formDataToSend
      );

      if (response.status === 200) {
        setSuccessMessage("Project updated successfully!");
        setErrors({});
        // Remove success message
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to updated project", error);
      setErrors({ general: "Project has not been updated" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg- dark:bg-slate-900 rounded-lg shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
        <div className="">
          <img
            src={imageUrl}
            alt={formData.name}
            className="h-full rounded-md"
          />
        </div>

        <div className="dark:border dark:border-slate-700 p-2 rounded-md">
          <h2 className="text-2xl dark:text-slate-400 font-bold text-slate-800 mb-2 flex items-center pb-2 border-b dark:border-slate-700">
            <FaEdit className="mr-1" /> Update Project
          </h2>

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}
          {errors.general && <p className="text-red-500">{errors.general}</p>}

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="post"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
                Type:
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
                Description:
              </label>

              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
                id=""
              ></textarea>

              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-400">
                Image:
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
              />
              {errors.image && (
                <p className="text-red-500 text-xs">{errors.image}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-success text-white mr-4"
              disabled={loading}
            >
              {loading ? "Updating data..." : "Update Project"} <FaEdit />
            </button>

            <button type="submit" className="btn btn-sm btn-primary text-white">
              <Link to="/" className="flex">
                <FaHome className="mr-2" /> Go Home
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectUpdateForm;

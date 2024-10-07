import { FaHome, FaPlusCircle } from "react-icons/fa";
import { useRef, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ProjectForm = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Separate state to handle file input
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.type) {
      newErrors.type = "Type is required";
    }
    if (!file) {
      newErrors.image = "Image is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  };

  // Handles file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "File size exceeds 5MB" });
    } else {
      setErrors({ ...errors, image: null });
      setFile(selectedFile);
    }
    // setFile(e.target.files[0]); // Capture the file from input
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        // Prepare FormData object to handle file upload
        const formDataWithFile = new FormData();
        formDataWithFile.append("name", formData.name);
        formDataWithFile.append("type", formData.type);
        formDataWithFile.append("description", formData.description);

        if (file) {
          formDataWithFile.append("image", file); // Append the file to FormData
        }
        console.log(file);

        // Log FormData content
        for (let pair of formDataWithFile.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = await api.post("/projects", formDataWithFile);

        if (response.status === 201 || response.status === 200) {
          setSuccessMessage("Project added successfully!");
          setFormData({
            name: "",
            type: "",
            description: "",
          });
          setFile(null); // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the actual file input element
          }
          setErrors({});
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to add project!", error);
        if (error.response && error.response.status === 400) {
          // Check if the error is from backend validation
          const backendErrors = error.response.data; // Expecting backend to return { message: "Error message." } or { errors: { fieldName: "Error message." } }
          if (backendErrors.errors) {
            // If backend returns field specific errors
            setErrors(backendErrors.errors);
          } else if (backendErrors.message) {
            setError(backendErrors.message);
          } else {
            setError("An unexpected error occurred. Please try again later");
          }
          setTimeout(() => {
            setError(""); // Clear backend error after timeout
          }, 2000);
        }
        setErrors({ general: "An error occurred. Please try again later." });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors); // Use the validated errors
      setTimeout(() => {
        setErrors({});
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Add project</title>
      </Helmet>

      <div className="lg:max-w-5xl mx-auto p-6 bg- rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-slate-800 flex items-center pb-2 dark:text-emerald-500 animate-pulse">
          <FaPlusCircle className="mr-2" />
          Add New Project
        </h2>

        {/* Display general backend error */}
        {error && (
          <p className="text-red-500 p-1 border border-red-800 rounded-md text-sm">
            {error}
          </p>
        )}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Project name..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-800"
              aria-required="true"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type:
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Project type..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-800"
              aria-required="true"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              File:
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-800"
              aria-required="true"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-800"
              aria-required="true"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="flex">
            <CTAButton
              type="submit"
              label={loading ? "Uploading..." : "Add Project"}
              variant="primary"
              disabled={loading}
              icon={<FaPlusCircle />}
              className=""
            />
            <Link to="/">
              <CTAButton
                type="submit"
                label={loading ? "Loading..." : "Go Home"}
                variant="primary"
                disabled={loading}
                icon={<FaHome />}
                className=""
              />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;

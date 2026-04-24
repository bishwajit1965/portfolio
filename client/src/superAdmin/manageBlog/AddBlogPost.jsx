import {
  FaCloudUploadAlt,
  FaDatabase,
  FaRegTimesCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import CKEditorComponent from "../textEditor/CKEditorComponent";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import Swal from "sweetalert2";
import apiRequest from "../utils/apiRequest";
import categoryApi from "../utils/categoryApi";
import tagApi from "../utils/tagApi";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import Button from "../../components/buttons/Button";
import { FaSpinner } from "react-icons/fa6";

const AddBlogPost = ({ isDark, customStyles, onCancel }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]); // To store fetched categories
  const [tags, setTags] = useState([]);
  const [willPublishAt, setWillPublishAt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // To handle selected categories
  const [selectedTags, setSelectedTags] = useState([]); // To handle selected tags
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleCancelUploadBlog = () => {
    onCancel(false);
  };

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        console.log("Fetched categories:", response);

        if (response && Array.isArray(response)) {
          const categoryOptions = response.map((category) => ({
            value: category._id,
            label: category.name,
          }));
          setCategories(categoryOptions); // Set the categories state
        } else {
          console.error("Unexpected data format or no categories found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetching all tags
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await tagApi.getAllTags();
        console.log("Fetched tags:", response);
        if (response && Array.isArray(response)) {
          const tagOptions = response.map((tag) => ({
            value: tag._id,
            label: tag.name,
          }));
          setTags(tagOptions);
        } else {
          console.log("Unexpected data format or no tags fetched.");
        }
      } catch (error) {
        console.error("Error in fetching tags, ", error);
      }
    };
    fetchAllTags();
  }, []);

  // For clearing error messages
  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]);
      }, 3000);
      // Clear the times if the component unmounts or the errors change
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessages([]);

    // Client-side validation
    const newErrors = [];

    // Title validation
    if (!title.trim()) {
      newErrors.push("Title is required.");
    } else if (title.length < 5 || title.length > 150) {
      newErrors.push("Title must be between 2 to 150 characters.");
    }

    // Post summary validation
    if (!summary.trim()) {
      newErrors.push("Summary is required.");
    } else if (summary.length < 10) {
      newErrors.push("Post summary must be at least 10 characters long.");
    }

    // Author validation
    if (!author.trim()) {
      newErrors.push("Author is required.");
    } else if (author.length < 5 || author.length > 50) {
      newErrors.push("Author name must be between 2 to 50 characters.");
    }

    // Content validation
    if (!content.trim()) {
      newErrors.push("Content is required.");
    } else if (content.length < 10) {
      newErrors.push("Content must be at least 10 characters long.");
    }

    // Categories validation
    if (selectedCategories.length === 0) {
      newErrors.push("At least one category must be selected.");
    }

    // Categories validation
    if (selectedTags.length === 0) {
      newErrors.push("At least one tag must be selected.");
    }

    // Status validation
    if (!status) {
      newErrors.push("Status is required.");
    }

    // Image validation
    if (!image) {
      newErrors.push("Image is required.");
    }

    // If there are validation errors, set them and stop form submission
    if (newErrors.length > 0) {
      setErrorMessages(newErrors);
      return; // Stop form submission
    }

    // Proceed with form submission
    setLoading(true);

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("author", author);
    formData.append("content", content);
    formData.append(
      "category",
      JSON.stringify(selectedCategories.map((cat) => cat.value)),
    );
    formData.append(
      "tag",
      JSON.stringify(selectedTags.map((tag) => tag.value)),
    );
    formData.append("status", status);
    formData.append("willPublishAt", willPublishAt);

    if (image) formData.append("imageUrl", image); // Append image file

    try {
      const response = await apiRequest("/blogPosts", "POST", formData, token, {
        autoMessage: true,
      });

      console.log("Form data value", formData);
      // Assuming the response will always be JSON in a successful case
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Blog post added successfully!",
        });
        setTitle("");
        setSummary("");
        setAuthor("");
        setContent("");
        setSelectedCategories([]);
        setSelectedTags([]);
        setStatus("draft");
        setImage(null);
        setWillPublishAt(null);
        setWillPublishAt(null);
        fileInputRef.current.value = null; // Clear file input
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: response.error,
        });
      }
    } catch (error) {
      setErrorMessages([
        error.message || "An error occurred while creating the post.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <Helmet>
        <title>Web-tech-services || Add Blog</title>
      </Helmet>

      <div
        style={styles.modalContent}
        className="bg-base-100 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-400 text-sm mb-1 max-h-[80vh] overflow-y-auto"
      >
        <SuperAdminPageSubHeader
          title="Add"
          decoratedText="Blog Posts"
          buttonLabel="Cancel Upload"
          variant="warning"
          icon={<FaRegTimesCircle />}
          labelIcon={<FaDatabase />}
          onButtonClick={handleCancelUploadBlog}
        />
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4"
          encType="multipart/form-data"
        >
          <div className="border lg:p-6 p-2 admin-dark:border-slate-700 rounded-lg mt-4 lg:space-y-4 space-y-2">
            <div className="grid lg:grid-cols-12 gird-cols-1 gap-4 justify-between">
              <div className="lg:col-span-8 col-span-12">
                <div className="form-control">
                  <label
                    htmlFor="title"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id=""
                    placeholder="Title..."
                    className="input input-sm input-bordered w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="lg:col-span-4 col-span-12">
                <div className="form-control">
                  <label
                    htmlFor="title"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Author:
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    id=""
                    placeholder="Author..."
                    className="input input-sm input-bordered w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 justify-between items-center gap-2">
              <div className="lg:col-span-6 col-span-12">
                <div className="form-control">
                  <label
                    htmlFor="title"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Upload File:
                  </label>
                  <input
                    type="file"
                    name="imageUrl"
                    accept="image/*"
                    onChange={handleImageChange} // Use the new handler
                    ref={fileInputRef}
                    className="file-input file-input-sm file-input-bordered w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 col-span-12">
                {/* New Field for Scheduling */}
                <label
                  htmlFor="status"
                  className="admin-dark:text-slate-400 text-sm mb-1"
                >
                  Will publish at:
                </label>
                <input
                  type="datetime-local"
                  name="willPublishAt"
                  value={willPublishAt}
                  onChange={(e) => setWillPublishAt(e.target.value)}
                  className="input input-sm w-full input-bordered admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between">
              <div className="lg:col-span-4 col-span-12">
                <div className="form-control">
                  <label
                    htmlFor="categories"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Categories:
                  </label>
                  {categories.length > 0 ? (
                    <Select
                      name="category"
                      options={categories}
                      isMulti
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      placeholder="Select categories"
                      styles={customStyles(isDark)}
                      noOptionsMessage={() => "No categories available"}
                    />
                  ) : (
                    <p>Loading categories...</p>
                  )}
                </div>
              </div>
              <div className="lg:col-span-4 col-span-12">
                <div className="form-control">
                  <label
                    htmlFor="tags"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Tags:
                  </label>
                  {tags.length > 0 ? (
                    <Select
                      name="tag"
                      options={tags}
                      isMulti
                      value={selectedTags}
                      onChange={handleTagChange}
                      placeholder="Select tags"
                      noOptionsMessage={() => "No tags available"}
                      styles={customStyles(isDark)}
                    />
                  ) : (
                    <p>Loading tags...</p>
                  )}
                </div>
              </div>
              <div className="lg:col-span-4 col-span-12">
                <div className="lg:col-span-4 col-span-12">
                  <label
                    htmlFor="status"
                    className="admin-dark:text-slate-400 text-sm mb-1"
                  >
                    Post Status
                  </label>
                  <Select
                    name="status"
                    styles={customStyles(isDark)}
                    value={{
                      value: status,
                      label: status.charAt(0).toUpperCase() + status.slice(1),
                    }}
                    onChange={(selected) => setStatus(selected.value)}
                    options={[
                      { value: "draft", label: "Draft" },
                      { value: "scheduled", label: "Scheduled" },
                      { value: "published", label: "Published" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="form-control">
              <label
                htmlFor="summary"
                className="admin-dark:text-slate-400 text-sm mb-1"
              >
                Post Summary:
              </label>
              <textarea
                className="textarea textarea-bordered h-16 w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
                placeholder="Post summary..."
                type="text"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control">
              <label
                htmlFor="content"
                className="admin-dark:text-slate-400 text-sm mb-1"
              >
                Post Content:
              </label>
              <CKEditorComponent value={content} onChange={setContent} />
              {/* <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Post content..."
                type="text"
                id="editor"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea> */}
            </div>
            <div className="lg:max-w- mx-auto shadow-md">
              {errorMessages.length > 0 && (
                <div className="alert alert-error text-white text-sm">
                  <div className="">
                    <div className="mb-2 border-b w-full">
                      <h2 className="text-md font-bold text-base-100 animate-bounce">
                        Error(s) Encountered : Please follow the instructions.
                      </h2>
                    </div>
                    <ul>
                      {errorMessages.map((error, index) => (
                        <li key={index}>
                          {index + 1}
                          {")"} {typeof error === "string" ? error : error.msg}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 justify-end">
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={loading}
                icon={
                  loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCloudUploadAlt />
                  )
                }
                label={loading ? "Uploading..." : "Add Blog Post"}
              />

              <Button
                type="button"
                onClick={handleCancelUploadBlog}
                size="sm"
                variant="warning"
                label="Cancel Upload"
                icon={<FaTimesCircle />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPost;
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
    // backgroundColor: "#fff",
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
    padding: "8px",
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

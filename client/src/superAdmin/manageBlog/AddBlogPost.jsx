import { FaBlogger, FaUpload } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import categoryApi from "../utils/categoryApi";
import fetchWithAuth from "../utils/fetchWithAuth";
import tagApi from "../utils/tagApi";

// import CKEditorComponent from "../textEditor/CKEditorComponent";

const AddBlogPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]); // To store fetched categories
  const [tags, setTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // To handle selected categories
  const [selectedTags, setSelectedTags] = useState([]); // To handle selected tags
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const fileInputRef = useRef(null);

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
    } else if (title.length < 5 || title.length > 50) {
      newErrors.push("Title must be between 2 to 50 characters.");
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
    formData.append("author", author);
    formData.append("content", content);
    formData.append(
      "category",
      JSON.stringify(selectedCategories.map((cat) => cat.value))
    );
    formData.append(
      "tag",
      JSON.stringify(selectedTags.map((tag) => tag.value))
    );
    formData.append("status", status);
    if (image) formData.append("image", image); // Append image file

    try {
      const response = await fetchWithAuth(
        "http://localhost:5000/api/blogPosts",
        {
          method: "POST",
          body: formData, // For multipart/form-data
        }
      );
      console.log("Form data value", formData);
      // Assuming the response will always be JSON in a successful case
      if (response.ok) {
        Swal.fire("Success", "Blog post created successfully", "success");
        setTitle("");
        setAuthor("");
        setContent("");
        setSelectedCategories([]);
        setSelectedTags([]);
        setStatus("draft");
        setImage(null);
        fileInputRef.current.value = null; // Clear file input
      } else {
        // Assuming the error is in JSON format
        const result = await response.json();
        setErrorMessages(result.errors || ["An unexpected error occurred."]);
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
    <>
      <Helmet>
        <title>Web-tech-services || Add Blog</title>
      </Helmet>

      <div>
        <SuperAdminPageTitle
          title="Add"
          decoratedText="Blog Posts"
          subtitle="Super admin can only manage all blog posts"
        />

        <div className="flex lg:justify-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
          <NavLink to="/super-admin/manage-blogs" className="m-0">
            <button className="btn btn-xs btn-primary">
              <FaBlogger />
              Manage Blog Post
            </button>
          </NavLink>
        </div>

        <div className="mt-4">
          <div className="lg:max-w-7xl mx-auto shadow-md">
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
          <div className="lg:max-w-7xl w-full flex mx-auto border rounded-md p-4 shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-2"
              encType="multipart/form-data"
            >
              <h2 className="text-xl font-bold border-b pb-1">
                Upload Blog Post
              </h2>
              <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id=""
                  className="input input-sm input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label htmlFor="title">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  id=""
                  className="input input-sm input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-12 justify-between items-center gap-2">
                <div className="lg:col-span-6 col-span-12">
                  <div className="form-control">
                    <label htmlFor="title">Upload File:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange} // Use the new handler
                      ref={fileInputRef}
                      className="file-input file-input-sm file-input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <label htmlFor="status">Post Status</label>
                  <Select
                    name="status"
                    value={{
                      value: status,
                      label: status.charAt(0).toUpperCase() + status.slice(1),
                    }}
                    onChange={(selected) => setStatus(selected.value)}
                    options={[
                      { value: "draft", label: "Draft" },
                      { value: "published", label: "Published" },
                    ]}
                  />
                </div>
              </div>
              <div className="form-control">
                <label>Categories:</label>
                {categories.length > 0 ? (
                  <Select
                    name="category"
                    options={categories}
                    isMulti
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    placeholder="Select categories"
                    noOptionsMessage={() => "No categories available"}
                  />
                ) : (
                  <p>Loading categories...</p>
                )}
              </div>

              <div className="form-control">
                <label>Tags:</label>
                {tags.length > 0 ? (
                  <Select
                    name="tag"
                    options={tags}
                    isMulti
                    value={selectedTags}
                    onChange={handleTagChange}
                    placeholder="Select tags"
                    noOptionsMessage={() => "No tags available"}
                  />
                ) : (
                  <p>Loading tags...</p>
                )}
              </div>

              <div className="my-">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Post Content:</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Post content..."
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  {/* <TextEditor value={content} onChange={setContent} /> */}

                  {/* <CKEditorComponent /> */}
                </label>
              </div>
              <div className="form-control pt-3">
                <button type="submit" className="btn btn-md btn-primary">
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaUpload />
                  )}
                  {loading ? "Uploading..." : " Add Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlogPost;

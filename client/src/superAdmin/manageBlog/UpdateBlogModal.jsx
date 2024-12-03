import { FaEdit, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

import Select from "react-select";

const UpdateBlogModal = ({ blog, categories, tags, onClose, onUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    content: "",
    author: "",
    imageUrl: "",
    category: [],
    tag: [],
    status: "",
  });

  // Preselected categories and tags
  useEffect(() => {
    if (blog && categories.length > 0 && tags.length > 0) {
      setFormData({
        _id: blog._id,
        title: blog.title || "",
        content: blog.content || "",
        author: blog.author || "",
        imageUrl: blog.imageUrl,
        category: blog.category || [],
        tag: blog.tag || [],
        status: blog.status || "draft",
      });
      console.log("Blog post data:", blog);

      // Map blog.categories to pre-select values
      const preselectedCategories = (
        Array.isArray(blog.category) ? blog.category : []
      )
        .map((categoryId) => {
          const matchedCategory = categories.find(
            (category) => category.value === categoryId
          );
          return matchedCategory
            ? { value: matchedCategory.value, label: matchedCategory.label }
            : null;
        })
        .filter(Boolean); //Removes the null value if there is no matching category
      setSelectedCategories(preselectedCategories);

      // Map blog.tags to pre-select values
      const preselectedTags = (Array.isArray(blog.tag) ? blog.tag : [])
        .map((tagId) => {
          const matchedTag = tags.find((tag) => tag.value === tagId);
          return matchedTag
            ? { value: matchedTag.value, label: matchedTag.label }
            : null;
        })
        .filter(Boolean); //Removes the null value if there is no matching tag
      setSelectedTags(preselectedTags);
    }
  }, [blog, categories, tags]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setSelectedImage(file); // Save the file to state for submission
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract updated fields
    const updatedData = {
      _id: blog._id,
      title: formData.get("title"),
      content: formData.get("content"),
      author: formData.get("author"),
      category: formData.getAll("category"),
      tag: formData.getAll("tag"),
      status: formData.get("status"),
    };

    const imageUrl = formData.get("imageUrl");
    const hasImage = imageUrl && imageUrl.size > 0; // Check if an image is provided

    if (hasImage) {
      // Include image along with categories and tags
      formData.append("category", JSON.stringify(updatedData.category));
      formData.append("tag", JSON.stringify(updatedData.tag));
      onUpdate(formData, true);
    } else {
      // Send the updated fields without image
      onUpdate(updatedData, false);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   // Extract updated values
  //   const updatedData = {
  //     _id: blog._id,
  //     title: formData.get("title"),
  //     content: formData.get("content"),
  //     author: formData.get("author"),
  //     category: formData.getAll("category"),
  //     tag: formData.getAll("tag"),
  //     status: formData.getAll("status"),
  //   };

  //   const imageUrl = formData.get("imageUrl");
  //   const selectedImage = imageUrl && imageUrl.size > 0; // Check if an image is uploaded

  //   if (selectedImage) {
  //     // Include image if selected
  //     formData.append("category", JSON.stringify(updatedData.category));
  //     formData.append("tag", JSON.stringify(updatedData.tag));
  //     onUpdate(formData, true);
  //   } else {
  //     // Pass updatedData without image
  //     onUpdate(updatedData, false);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Prepare the data to send
  //   const formDataToSend = {
  //     ...formData, // Form fields like title, content, etc.
  //     _id: blog._id, // Blog ID for identification during update
  //     category: selectedCategories.map((cat) => cat.value), // Category IDs
  //     tag: selectedTags.map((tag) => tag.value), // Tag IDs
  //   };

  //   // Initialize FormData if there is an image
  //   const formDataWithImage = new FormData();

  //   // Append image if selected
  //   if (selectedImage) {
  //     formDataWithImage.append("imageUrl", selectedImage);
  //   }

  //   // Append the rest of the form fields to FormData
  //   for (const key in formDataToSend) {
  //     formDataWithImage.append(key, formDataToSend[key]);
  //     console.log("Keys:", { key });
  //   }

  //   // Log the final FormData or data to check
  //   console.log("Form Data to send:", formDataWithImage);

  //   if (selectedImage) {
  //     // If image is selected, submit with image
  //     await onUpdate(formDataWithImage, true);
  //   } else {
  //     // Otherwise, submit without image
  //     await onUpdate(formDataToSend, false);
  //   }
  // };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 className="text-xl font-bold">Update Blog Post</h2>
        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div style={styles.formGroup}>
            <label htmlFor="title">Blog Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={styles.input}
              required
              className="input-sm"
            />
          </div>

          {/* Content */}
          <div style={styles.formGroup}>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              cols="56"
              rows="6"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              style={styles.textarea}
              className="w-full border p-2 text-xs rounded-b-md mb-[-10px]"
              required
            ></textarea>
          </div>

          {/* Author */}
          <div style={styles.formGroup}>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              style={styles.input}
              required
              className="input-sm"
            />
          </div>

          {/* Image */}
          <div style={styles.formGroup}>
            <label htmlFor="image">Image:</label>
            <div className="lg:flex grid justify-between gap-4 items-center mb-4">
              <div className="">
                {formData.imageUrl && !selectedImage && (
                  <img
                    src={`${apiUrl}${blog.imageUrl}`}
                    alt={blog.title}
                    width="100"
                    className="w-28 h-10 rounded-sm"
                  />
                )}
              </div>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.input}
              />
            </div>
          </div>

          {/* Categories Multi-Select */}
          <div style={styles.formGroup}>
            <label htmlFor="categories">Categories:</label>
            <Select
              id="categories"
              name="category"
              isMulti
              options={categories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select categories"
              className="w-full"
            />
          </div>

          {/* Tags Multi-Select */}
          <div style={styles.formGroup}>
            <label htmlFor="tag">Tags:</label>
            <Select
              id="tags"
              name="tag"
              isMulti
              options={tags}
              value={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select tags"
              className="w-full"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="status">Post status:</label>
            <select
              name="status"
              value={formData.status} // Show the previously uploaded status
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              } // Update status on change
              className="w-full p-[6px] border mb-2"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button
              className="flex items-center btn btn-sm"
              type="submit"
              style={styles.buttonPrimary}
            >
              <FaEdit />
              Update
            </button>
            <button
              className="flex items-center btn btn-sm"
              type="button"
              onClick={onClose}
              style={styles.buttonSecondary}
            >
              <FaTimesCircle />
              Cancel
            </button>
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
    padding: "20px",
    borderRadius: "8px",
    width: "700px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.26)",
  },
  formGroup: {
    marginBottom: "5px",
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

export default UpdateBlogModal;

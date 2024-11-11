import { useEffect, useState } from "react";

import Select from "react-select";

const UpdateBlogModal = ({ blog, categories, tags, onClose, onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
    category: [],
    tag: [],
    status: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        imageUrl: blog.imageUrl,
        category: blog.category || [],
        tag: blog.tag || [],
        status: blog.status || "draft",
      });
    }
  }, [blog]);

  // Preselected categories and tags
  useEffect(() => {
    if (blog && categories.length > 0 && tags.length > 0) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlogPost = {
      ...blog,
      title: formData.title,
      content: formData.content,
      author: formData.author,
      imageUrl: selectedImage ? selectedImage.filename : formData.imageUrl,
      category: selectedCategories.map((cat) => cat.value),
      tag: selectedTags.map((tag) => tag.value),
      status: formData.status || "draft",
    };
    onUpdate(updatedBlogPost);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 className="text-xl font-bold">Update Blog Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title */}
          <div style={styles.formGroup}>
            <label htmlFor="title">Blog Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                    src={`http://localhost:5000${blog.imageUrl}`}
                    alt={blog.title}
                    width="100"
                    className="w-28 h-10 rounded-sm"
                  />
                )}
              </div>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
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
            <button type="submit" style={styles.buttonPrimary}>
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              style={styles.buttonSecondary}
            >
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

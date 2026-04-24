import { FaEdit, FaSpinner, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../components/buttons/Button";
import CKEditorComponent from "../textEditor/CKEditorComponent";

const UpdateBlogModal = ({
  blog,
  categories,
  tags,
  onClose,
  onUpdate,
  loading,
  isDark,
  customStyles,
}) => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    summary: "",
    content: "",
    author: "",
    imageUrl: "",
    category: [],
    tag: [],
    status: "",
    updatedAt: "",
  });

  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
  };

  // Preselected categories and tags
  useEffect(() => {
    if (blog && categories.length > 0 && tags.length > 0) {
      setFormData({
        _id: blog._id,
        title: blog.title || "",
        summary: blog.summary || "",
        content: blog.content || "",
        author: blog.author || "",
        imageUrl: blog.imageUrl,
        category: blog.category || [],
        tag: blog.tag || [],
        status: blog.status || "draft",
        // updatedAt: blog.updatedAt || new Date(),
        updatedAt: new Date().toISOString(),
      });

      // Map blog.categories to pre-select values
      const preselectedCategories = (
        Array.isArray(blog.category) ? blog.category : []
      )
        .map((categoryId) => {
          const matchedCategory = categories.find(
            (category) => category.value === categoryId,
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Save the file to state for submission
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      _id: blog._id,
      title: formData.title,
      summary: formData.summary,
      content: formData.content, // 🔥 ONLY SOURCE
      author: formData.author,
      category: selectedCategories.map((c) => c.value),
      tag: selectedTags.map((t) => t.value),
      status: formData.status,
      updatedAt: new Date().toISOString(),
    };

    const imageFile = selectedImage;

    try {
      if (imageFile) {
        const fd = new FormData();

        Object.entries(updatedData).forEach(([key, value]) => {
          if (key === "category" || key === "tag") {
            fd.append(key, JSON.stringify(value));
          } else {
            fd.append(key, value);
          }
        });

        fd.append("imageUrl", imageFile);

        await onUpdate(fd, true);
      } else {
        await onUpdate(updatedData, false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <div
        style={styles.modalContent}
        className="bg-base-100 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-400 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="lg:text-xl text-lg font-bold flex items-center gap-2 border-b-2 border-slate-400 admin-dark:border-slate-600 mb-4">
          <FaEdit /> Update Blog Post
        </h2>
        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
          className="space-y-2"
        >
          {/* Title */}
          <div>
            <label htmlFor="title">Blog Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="input input-sm input-bordered w-full admin-dark:bg-slate-800/90 admin-dark:border-slate-600"
            />
          </div>

          {/* Post summary */}
          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea
              type="text"
              id="summary"
              cols="56"
              rows="2"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              className="textarea textarea-sm w-full admin-dark:bg-slate-800/90 admin-dark:border-slate-600 h-14"
              required
            ></textarea>
          </div>

          {/* Content */}
          <div style={styles.formGroup}>
            <label htmlFor="content">Content:</label>
            <CKEditorComponent
              value={formData.content}
              onChange={handleEditorChange}
              id="content"
              name="content"
            />

            {/* <textarea
              type="text"
              id="content"
              cols="56"
              rows="4"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              // style={styles.textarea}
              className="textarea textarea-sm w-full admin-dark:bg-slate-800/90 admin-dark:border-slate-600 h-14"
              required
            ></textarea> */}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="input input-sm input-bordered w-full admin-dark:bg-slate-800/90 admin-dark:border-slate-600"
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image">Image:</label>
            <div className="lg:flex grid justify-between gap-4 items-center mb-4">
              <div className="">
                {formData.imageUrl && !selectedImage && (
                  <img
                    src={getImageSrc(formData.imageUrl)}
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
                className="file-input file-input-sm file-input-neutral w-full admin-dark:bg-slate-800/90 admin-dark:border-slate-600"
              />
            </div>
          </div>

          {/* Categories Multi-Select */}
          <div>
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
              styles={customStyles(isDark)}
            />
          </div>

          {/* Tags Multi-Select */}
          <div>
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
              styles={customStyles(isDark)}
            />
          </div>

          <div>
            <label htmlFor="status">Post status:</label>
            <select
              name="status"
              value={formData.status} // Show the previously uploaded status
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              } // Update status on change
              className="select select-sm select-bordered admin-dark:bg-slate-800 admin-dark:border-slate-600 w-full rounded-md"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              className={loading ? "cursor-not-allowed" : ""}
              type="submit"
              variant="success"
              size="sm"
              label={loading ? "Updating..." : "Update Post"}
              icon={
                loading ? <FaSpinner className="animate-spin" /> : <FaEdit />
              }
              disabled={loading}
            />

            <Button
              variant="warning"
              size="sm"
              type="button"
              onClick={onClose}
              label="Cancel"
              icon={<FaTimesCircle />}
            />
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
    // backgroundColor: "#fff",
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

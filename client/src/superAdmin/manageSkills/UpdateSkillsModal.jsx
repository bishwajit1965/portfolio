import { useEffect, useState } from "react";
import { FaEdit, FaTimesCircle } from "react-icons/fa";

import Select from "react-select";
const UpdateSkillsModal = ({ skill, onClose, onUpdate }) => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    skillName: "",
    level: "",
    experience: "",
    tools: [],
    category: [],
    updatedAt: "",
  });

  const toolsArray = skill?.tools;
  const categoryArray = skill.category;

  const toolOptions = toolsArray.map((tool) => ({
    value: tool,
    label: tool,
  }));

  const categoryOptions = categoryArray.map((category) => ({
    value: category,
    label: category,
  }));

  useEffect(() => {
    if (skill) {
      setFormData({
        _id: skill._id,
        skillName: skill.skillName || "",
        level: skill.level || "",
        experience: skill.experience || "",
        tools: skill.tools || [],
        category: skill.category || [],
        updatedAt: new Date().toISOString(),
      });

      setSelectedTools(skill?.tools?.map((t) => ({ value: t, label: t })));
      setSelectedCategories(
        skill?.category?.map((c) => ({ value: c, label: c }))
      );
    }
  }, [skill]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract updated fields
    const updatedSkillsData = {
      _id: skill._id,
      skillName: formData.get("skillName"),
      level: formData.get("level"),
      experience: formData.get("experience"),
      tools: selectedTools.map((t) => t.value),
      category: selectedCategories.map((c) => c.value),
      updatedAt: new Date().toISOString(),
    };

    // Send the updated fields without image
    onUpdate(updatedSkillsData, false);
  };
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div className="my-4 border-b pb-2">
          <h2 className="lg:text-xl font-extrabold flex items-center gap-2">
            {" "}
            <FaEdit /> Update Skills
          </h2>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          {/* Skill name */}
          <div style={styles.formGroup}>
            <label htmlFor="title">Skill name:</label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              value={formData.skillName}
              onChange={handleInputChange}
              style={styles.input}
              required
              className="input-sm"
            />
          </div>

          {/* Level */}
          <div style={styles.formGroup}>
            <label htmlFor="summary">Level:</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              style={styles.input}
              className="input-sm"
              required
            />
          </div>

          {/* Experience */}
          <div style={styles.formGroup}>
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              cols="56"
              rows="4"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              style={styles.textarea}
              className="w-full border p-2 text-xs rounded-b-md mb-[-10px]"
              required
            />
          </div>

          {/* Tools Multi-Select */}
          <div style={styles.formGroup}>
            <label htmlFor="tools">Tools:</label>
            <Select
              id="tools"
              name="tools"
              isMulti
              options={toolOptions}
              value={selectedTools}
              onChange={setSelectedTools}
              placeholder="Select categories"
              className="w-full"
            />
          </div>

          {/* Category Multi-Select */}
          <div style={styles.formGroup}>
            <label htmlFor="category">Category:</label>
            <Select
              id="category"
              name="category"
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select tags"
              className="w-full"
            />
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
    padding: "25px",
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
    paddingTop: "15px",
    paddingBottom: "10px",
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
  padding: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
};

export default UpdateSkillsModal;
